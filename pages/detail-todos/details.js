import React from 'react';

const Details = ({ data }) => {
    return <div>
    <ul>
        <li>id - {data.id}</li>
        <li>title - {data.title}</li>
        <li>status - {data.completed ? "yes" : "no"}</li>
        </ul>
    </div>
}

export default Details;