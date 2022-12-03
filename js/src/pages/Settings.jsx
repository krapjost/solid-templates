import { useParams, createResource, A } from '@solidjs/router';

const fetchUser = () => {
    return {
        "id": "1"
        "name": "gidoong",
        "github": "https://github.com/krapjost"
    }
}

const User = () => {
    const params = useParams();
    const [userData] = createResource(() => params.id, fetchUser);

    return (
        <A href={userData.github}>{userData.name}</A>
    )
}

export default User;
