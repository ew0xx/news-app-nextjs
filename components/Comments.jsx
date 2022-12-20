import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/tr' 
import parse from 'html-react-parser';

import { getComments } from '../services';

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result);
    });
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length}
            {' '}
            Yorum
          </h3>
            {comments.map((comment, index) => (
              <div key={index} className="border-b border-gray-100 mb-4 pb-4">
                <p className="mb-4 relative">
                  <span className="font-semibold justify">{comment.attributes.name}</span>
                  {' '}
                  <span className="absolute inset-y-0 right-0">{moment(comment.createdAt).format('MMM DD, YYYY')}</span>
                  
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.attributes.comment)}</p>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Comments;
