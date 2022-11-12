import React from 'react';

const DetailedComments = ({ data }) => {
  return (
    <section>
        <h3>Detailed Comments</h3>
        <div>

                <ul>
                    <li>id - {data.postId}</li>
                    <li>name - {data.name}</li>
                    <li>email - {data.email}</li>
                </ul>

        </div>
        <style jsx>{`

        `}</style>
    </section>
  );
};

DetailedComments.getInitialProps = async (ctx) => {
  let data = await fetch(`https://jsonplaceholder.typicode.com/comments/${ctx.query.id}`, { method: "get" });
  data = await data.json();
  return { data };
};

export default DetailedComments;
