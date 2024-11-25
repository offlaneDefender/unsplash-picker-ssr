import Client from "./components/client";
import { createApi } from "unsplash-js";

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

async function ClientPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const { name, surname, preference } = await searchParams;

    const fetchImages = async (preference: string) => {
        "use server"
        const finalPref = preference;
        const response = await unsplash.search.getPhotos({
            query: finalPref,
            perPage: 10,
        }).then(res => res.response).then(res => res?.results).then(res => res?.map((photo: any) => photo.urls.thumb))
            .catch(err => console.log(err));

        if (!response) {
            return;
        }
        return response;
    };

    const fetchRandomImage = async (preference: string) => {
        "use server"
        const finalPref = preference;

        //since we don't specify the count, it will return a single random image
        const response = await unsplash.photos.getRandom({
            query: finalPref,
        }).then(res => res.response)
            .catch(err => console.log(err));

        if (!response) {
            return [];
        }

        return [(response as any).urls.thumb];
    };

    return (
        <div>
            <Client callback={fetchImages} name={name as string} surname={surname as string} pref={preference as string} randomCallback={fetchRandomImage} />
        </div>
    );
};

export default ClientPage;