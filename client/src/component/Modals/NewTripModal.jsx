import React, { useMemo, useState, lazy, Suspense, useEffect } from 'react'
import Modal from './Modal'
import useNewTripModal from '../../hooks/useNewTripModal'
import Heading from '../Heading';
import FriendBox from '../inputs/FriendsInput';
import CountrySelect from '../inputs/CountrySelect';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import axios from 'axios';
import Input from '../inputs/Input';
import DatePicker from '../inputs/DatePicker';
import { DateRange } from 'react-date-range';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { getUser, createUser } from '../../api/users';





const SimpleMap = lazy(() => import('../SimpleMap'));

// for each step in popout
const STEPS = {
    LOCATION: 0,
    DATES: 1,
    IMAGES: 2,
    FRIENDS: 3,
    CREATE: 4,
    INFO: 5
};


const NewTripModal = ({user, friends}) => {
    // using the hooks
    const newTripModal = useNewTripModal();

    // state
    const [step, setStep] = useState(STEPS.LOCATION);
    const [User, setUser] = useState({});
    const [randomPhotoNum, setRandomPhotoNum] = useState(Math.floor(Math.random() * 10));
    // specfic for into edit page
    const [postInfo, setPostInfo] = useState({});
    const navigate = useNavigate();

    const getUserschema = async () => {
        const fetchedUser = await getUser(user);
        if (fetchedUser === null) {
          console.log("not created yet");
          const createdUser = await createUser(user);
          setUser(createdUser);
        }
        else{
          setUser(fetchedUser);
          console.log(User);
        }
    }
    useEffect(() => {
        getUserschema();
    }, []);

    const closeAndReset = () => {
        reset();
        setState([{startDate: new Date(),endDate: new Date(),key: 'selection'}])
        setStep(STEPS.LOCATION);
        newTripModal.onClose();
        navigate(0);
    }

    // for changing steps
    const onBack = () => {
        if (step === STEPS.INFO) {
            closeAndReset();
        }
        else {
            setStep((value) => value - 1);
        }
    }
    const onNext = () => {

        // if (step === STEPS.CREATE) {
        //     // submit !!!
        //     submitTrip(watch());
        //     setStep((value) => value + 1);
        // }
        if (step === STEPS.INFO) {
            // now just close it
            // TODO: go into planning trip page
            console.log(postInfo);
            navigate('/edit', { state: { post: postInfo } });
        } else {
            setStep((value) => value + 1);
        }
    }
    const actionLabel = useMemo(() => {
        // if last Step
        if (step === STEPS.CREATE) {
            return 'Create';
        }
        if (step === STEPS.INFO) {
            return 'Start Planning';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        // if first step
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        if (step === STEPS.INFO) {
            return 'Not now';
        }
        return 'Back';
    })

    const getDefaultPhoto = async (country) => {
        try {
            // Make a request to Unsplash API to fetch a random photo based on the country name
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${country}&per_page=10&client_id=2de768rvWr0F9GB4qbejQBcD2QVYcAFZ8IHhDXt4N94`);
            const data = await response.json();

            // Extract the URL of the photo from the response data
            if (data && data.results[randomPhotoNum] && data.results[randomPhotoNum].urls.regular) {
                console.log('I get photo')
                return data.results[randomPhotoNum].urls.regular;
            }
        } catch (error) {
            console.log('Error fetching default photo:', error);
        }

        // Default photo URL if no photo is found
        return 'default_photo.jpg';
    };

    const handleChangePhoto = () => {
        setRandomPhotoNum(prevIndex => (prevIndex + 1) % 10); // Increment the random index within the range of 0-9
    };

    useEffect(() => {
        const updateSelectedPhoto = async () => {
            if (location && location.label) {
                try {
                    // Update selected photo based on the country and randomPhotoIndex
                    const photoUrl = await getDefaultPhoto(location.label);
                    setCustomValue('imageSrc', photoUrl);
                } catch (error) {
                    console.log('Error fetching default photo:', error);
                }
            }
        };

        updateSelectedPhoto();
    }, [randomPhotoNum]);

    // using the react-hook-form, for recording the data of all input
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm({
        defaultValues: {
            location: null,
            imageSrc: '',
            title: '',
        }
    });

    const location = watch('location');
    const title = watch('title');
    const imageSrc = watch('imageSrc');

    const onSubmit = (data) => {
        if (step !== STEPS.CREATE) {
            return onNext();
        }

        

        const postData = {
            creatorId: user.username,
            postTitle: title,
            picturePath: imageSrc,
            location: location.label,
            days: calculateDays(),
            schedule: emptyScheduleArray(),
            Members: [],
            dates: [startDateString(), endDateString()],
        };

        console.log([postData]);
        setPostInfo(postData);
        axios.post('http://localhost:3030/posts', postData)
            .then((response) => {
                if (response.status === 201) {
                    console.log('Trip created successfully:', response.data);
                    // Handle any further actions after successful creation of the trip
                } else {
                    console.log('Failed to create trip:', response.status);
                    // Handle the error case if the trip creation fails
                }
            })

        onNext();
        // .then(() => {
        //     reset();
        //     setStep(STEPS.LOCATION);
        // })


    }


    const setCustomValue = (id, value) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    };

    useEffect(() => {
        console.log(title);
    }, [title]);

    const handleCountryChange = async (value) => {
        setCustomValue('location', value);
        if (value && value.label) {
            setCustomValue('title', `Trip to ${value.label}`);
            try {
                // Update selected photo based on the country
                const photoUrl = await getDefaultPhoto(value.label);
                setCustomValue('imageSrc', photoUrl);
            } catch (error) {
                console.log('Error fetching default photo:', error);
            }
        } else {
            setCustomValue('title', '');
            setCustomValue('imageSrc', '');
        }
    };


    // fake friends
    // const friends = [{ name: 'Jennie' }, { name: 'Aaron' }, { name: 'Smith' }, { name: 'Porter' }, { name: 'Michael' }, { name: 'Samantha' },]

    // for date picker
    // Add these lines at the top of your component
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    // Function to calculate the number of days
    const calculateDays = () => {
        const { startDate, endDate } = state[0]; // Extract the startDate and endDate from the state
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))+1; // Calculate the difference in days

        return days;
    };

    const emptyScheduleArray = () => {
        return Array.from({ length: calculateDays() }, () => []);
    }

    const startDateString = () => {
        return (
            moment(state[0].startDate).format("YYYY/MM/DD")
        )
    } 

    const endDateString = () => {
        return (
            moment(state[0].endDate).format("YYYY/MM/DD")
        )
    }
    

    useEffect(() => {
        console.log(state[0]);
    }, [state])

    // STEP 1: choose place
    let bodyContenet = (
        <div className='flex flex-col gap-8'>
            <Heading
                title="Where are you going to ?"
            />
            <CountrySelect
                value={location}
                onChange={handleCountryChange}
            />
            <Suspense fallback={<div>Loading...</div>}>
                <SimpleMap key={location?.value} center={location?.latlng} />
            </Suspense>
        </div>
    )

    // STEP 2: choose date
    if (step === STEPS.DATES) {
        bodyContenet = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Select your date"
                    subtitle=""
                />
                <div className="w-full">
                    <DateRange
                        editableDateInputs={true}
                        minDate={new Date()}
                        onChange={item => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                    />
                </div>
            </div>
        )
    }

    // STEP 3: choose image
    if (step === STEPS.IMAGES) {
        bodyContenet = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Select the photo for your trip"
                    subtitle="Get a nice picture"
                />
                {imageSrc && (
                    // Display selected photo
                    <div className='relative'>
                        <img src={imageSrc} alt="Selected Photo" className="rounded-xl shadow-lg object-cover aspect-[4/3] " />
                        <button className='pt-4 text-md text-gray-600 ' onClick={handleChangePhoto}>change a new photo</button>
                    </div>
                )}
            </div>
        )
    }

    // STEP 4: choose friends
    if (step === STEPS.FRIENDS) {
        bodyContenet = (
            <div className='flex flex-col gap-8'>
                <Heading title='Invite your friends' subtitle='Choose who you are going with' />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                    {friends.map((item) => {
                        return (
                            <div key={item.userName} className='col-span-1'>
                                <FriendBox
                                    onClick={() => { }}
                                    selected={false}
                                    label={item.userName} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    // STEP 5: change title
    if (step === STEPS.CREATE) {
        bodyContenet = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Give your trip a title "
                    subtitle="Or use a default name"
                />
                <Input
                    id='title'
                    label='Title'
                    value={title}
                    errors={errors}
                    required
                    onChange={(e) => setCustomValue('title', e.target.value)}
                />
            </div>
        );
    }


    // STEP 6: look information
    if (step === STEPS.INFO) {
        bodyContenet = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title={title}
                    center
                />
                <div className='relative text-lg text-gray-900 font-semibold text-left'>
                    <img
                        src={imageSrc}
                        alt="Selected Photo"
                        className="rounded-xl shadow-lg object-cover aspect-[5/3]"
                    />
                    {/* <div className="mt-10">
                        <span className="text-gray-700 px-3">Trip Title:</span> {title || ''}
                    </div> */}
                    <div className="mt-3">
                        <span className="text-gray-700 px-3">Location:</span> {location?.label || ''}
                    </div>
                    <div className="mt-3">
                        <span className="text-gray-700 px-3">Members:</span>
                    </div>
                    {/* <div className="pl-4"> */}
                    {/* Render the selected friends */}
                    {/* {friends.map((item) => (
                            <div key={item.name} className="ml-2">
                                {item.name}
                            </div>
                        ))} */}
                    {/* </div> */}
                    <div className="mt-3">
                        <span className="text-gray-700 px-3">Dates:</span> {startDateString()} - {endDateString()}
                    </div>
                </div>
            </div>
        );
    }


    return (
        <>
            <Modal
                isOpen={newTripModal.isOpen}
                onClose={newTripModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                actionLabel={actionLabel}
                secondaryActionLabel={secondaryActionLabel}
                secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
                title={step === STEPS.INFO ? "This is your trip info" : "Let's create your Trip !"}
                body={bodyContenet}
                closeAndReset={step === STEPS.INFO ? closeAndReset : undefined}
            />
        </>
    )
}

export default NewTripModal


