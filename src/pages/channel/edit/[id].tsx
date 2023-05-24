import {useRouter} from 'next/router';
import axios from "axios";

export default function Channel({channel}) {
    const router = useRouter();
    const {id} = router.query;
    return (
        <div>
            <h1>Article {id}</h1>
            <div></div>
        </div>
    );
}

export async function getServerSideProps(context, {params}) {
    const token = context.req.cookies.jetonJWT;
    const channel = await axios.get(`http://localhost:8080/channel/${params.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const channelData = channel.data;

    return {
        props: {
            article: channelData,
        },
    };
}
