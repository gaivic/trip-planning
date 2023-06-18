import { Typography } from "@material-tailwind/react";

export default function TripInfo({post}) {

    
    return (
        <figure className="relative h-full w-full">
            <img
                className="h-full w-full aspect-[8/3] object-cover"
                src={post.picturePath}
                alt="nature image"
            />
            <figcaption className="absolute bottom-4 left-2/4 flex w-[calc(100%-2rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-lg">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        {post.postTitle}
                    </Typography>
                    <Typography color="gray" className="mt-2 font-normal">
                        {post.dates[0]} - {post.dates[1]}
                    </Typography>
                </div>
                <Typography variant="h5" color="blue-gray">
                    Members
                </Typography>
            </figcaption>
        </figure>
    );
}