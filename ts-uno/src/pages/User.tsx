import { useParams, A } from '@solidjs/router';
import { Component, createResource } from 'solid-js'

const fetchUser = (id) => {
    return [
        {
            "id": "1",
            "name": "gidoong",
            "github": "https://github.com/krapjost"
        },
        {
            "id": "2",
            "name": "jajaj",
            "github": "https://github.com/jajaj"
        },
    ][id];
}

const User: Component = () => {
    const params = useParams();
    const [userData] = createResource(() => params.id, fetchUser);
    return (
        <A href={userData().github}>{userData().name}</A>
    )
}

export default User;
