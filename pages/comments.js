import React from 'react';
import Link from 'next/link'

const Comments = ({ data }) => {
  return (
    <section>
        <h3>Comments</h3>
        {data.map(k => <div key={k.postId + ""+k.name}>
            <Link href={`/detailed-comment/${k.postId}`}>
                <ul className='box'>
                    <li>id - {k.postId}</li>
                    <li>name - {k.name}</li>
                    <li>email - {k.email}</li>
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

Comments.getInitialProps = async ({ ctx }) => {
  let data = await fetch('https://jsonplaceholder.typicode.com/comments', { method: "get" });
  data = await data.json();
  return { data };
};

export default Comments;
