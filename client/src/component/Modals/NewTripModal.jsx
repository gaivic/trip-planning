import React, { useMemo, useState, lazy, Suspense, useEffect } from 'react'
import Modal from './Modal'
import useNewTripModal from '../../hooks/useNewTripModal'
import Heading from '../Heading';
import FriendBox from '../inputs/FriendsInput';
import CountrySelect from '../inputs/CountrySelect';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Input from '../inputs/Input';
import DatePicker from '../inputs/DatePicker';
import { DateRange } from 'react-date-range';




const SimpleMap = lazy(() => import('../SimpleMap'));

// for each step in popout
const STEPS = {
    LOCATION: 0,
    DATES: 1,
    IMAGES: 2,
    FRIENDS: 3,
    INFO: 4,
};


const NewTripModal = () => {
    // using the hooks
    const newTripModal = useNewTripModal();

    // state
    const [step, setStep] = useState(STEPS.LOCATION);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [randomPhotoNum, setRandomPhotoNum] = useState(Math.floor(Math.random() * 10));


    // for changing steps
    const onBack = () => {
        setStep((value) => value - 1);
    }
    const onNext = () => {
        setStep((value) => value + 1);
    }
    const actionLabel = useMemo(() => {
        // if last Step
        if (step === STEPS.INFO) {
            return 'Create';
        }
        return 'Next';
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        // if first step
        if (step === STEPS.LOCATION) {
            return undefined;
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
                    setSelectedPhoto(photoUrl);
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
            category: '',
            location: null,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    const location = watch('location');
    const title = watch('title');

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
                setSelectedPhoto(photoUrl);
            } catch (error) {
                console.log('Error fetching default photo:', error);
            }
        } else {
            setCustomValue('title', '');
            setSelectedPhoto(null);
        }
    };


    // fake friends
    const friends = [{ name: 'Jennie' }, { name: 'Aaron' }, { name: 'Smith' }, { name: 'Porter' }, { name: 'Michael' }, { name: 'Samantha' },]

    // for date picker
    // Add these lines at the top of your component
    const [selectedDate, setSelectedDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });

    const disabledDates = []; // Define your disabled dates array here 


    // STEP 1: 
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

    // STEP 2: 
    if (step === STEPS.DATES) {
        bodyContenet = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Select your date"
                    subtitle=""
                />
                <div className="w-full">
                    <DatePicker
                        value={selectedDate}
                        onChange={(value) => { }}
                        disabledDates={disabledDates}
                    />
                </div>

            </div>
        )
    }

    // STEP 3:
    if (step === STEPS.IMAGES) {
        bodyContenet = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Select the photo for your trip"
                    subtitle="Get a nice picture"
                />
                {selectedPhoto && (
                    // Display selected photo
                    <div className='relative'>
                        <img src={selectedPhoto} alt="Selected Photo" className="rounded-xl shadow-lg object-cover aspect-[4/3] " />
                        <button className='pt-4 text-md text-gray-600 ' onClick={handleChangePhoto}>change a new photo</button>
                    </div>
                )}
            </div>
        )
    }

    // STEP 3:
    if (step === STEPS.FRIENDS) {
        bodyContenet = (
            <div className='flex flex-col gap-8'>
                <Heading title='Invite your friends' subtitle='Choose who you are going with' />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                    {friends.map((item) => {
                        return (
                            <div key={item.name} className='col-span-1'>
                                <FriendBox
                                    onClick={() => { }}
                                    selected={false}
                                    label={item.name} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    // STEP 4:
    if (step === STEPS.INFO) {
        bodyContenet = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Give your trip a title "
                    subtitle="Or use a default name"
                />
                <Input id='title' label='Title' defaultValue={`Trip to ${location?.label || ""}`} errors={errors} required />

            </div>
        )
    }

    return (
        <>
            <Modal
                isOpen={newTripModal.isOpen}
                onClose={newTripModal.onClose}
                onSubmit={onNext}
                actionLabel={actionLabel}
                secondaryActionLabel={secondaryActionLabel}
                secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
                title="Let's create your Trip !"
                body={bodyContenet} />
        </>
    )
}

export default NewTripModal


