import { useParams, createResource, A } from '@solidjs/router';
import type { Component } from 'solid-js'

const fetchUser = () => {
    return {
        "id": "1"
        "name": "gidoong",
        "github": "https://github.com/krapjost"
    }
}

const User: Component = () => {
    const params = useParams();
    const [userData] = createResource(() => params.id, fetchUser);

    return (
        <A href={userData.github}>{userData.name}</A>
    )
}

export default User;
