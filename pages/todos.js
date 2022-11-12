import React from 'react';
import Link from 'next/link'

const Todos = ({ data }) => {
  return (
    <section>
        <h3>Todos</h3>
        {data.map(k => <div>
            <Link href={`/detail-todos/${k.id}`}>
                <ul className='box'>
                    <li>id - {k.id}</li>
                    <li>title - {k.title}</li>
                    <li>status - {k.completed ?"yes": "no"}</li>
                </ul>
            </Link>
        </div>)}
        <style jsx>{`
            .box {
                border: 1px solid red;
                max-width: 300px;
                cursor: pointer;
            }
        `}</style>
    </section>
  );
};

Todos.getInitialProps = async ({ ctx }) => {
  let data = await fetch('https://jsonplaceholder.typicode.com/todos', { method: "get" });
  data = await data.json();
  return { data };
};

export default Todos;
