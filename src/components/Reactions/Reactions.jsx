import React, { useEffect, useState } from "react";
import { IoLogoTwitter, IoLogoLinkedin, IoLogoFacebook } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import ResponsesItem from "../ResponsesItem/ResponsesItem";
import { Link } from "react-router-dom";

export default function Reactions({ reviews, postReview, user, editResponse, deleteResponse, claps, postClaps }) {
  const [review, setReview] = useState("");
  const [responses, setResponses] = useState(false);
  const [clapsModal, setClaps] = useState(false);
  console.log(claps);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button variant='link' className='p-0' onClick={postClaps}>
            <svg width='33' height='33' viewBox='0 0 33 33' aria-label='clap'>
              <path
                d={
                  !claps.find((clap) => clap._id === user._id)
                    ? "M28.86 17.34l-3.64-6.4c-.3-.43-.71-.73-1.16-.8a1.12 1.12 0 0 0-.9.21c-.62.5-.73 1.18-.32 2.06l1.22 2.6 1.4 2.45c2.23 4.09 1.51 8-2.15 11.66a9.6 9.6 0 0 1-.8.71 6.53 6.53 0 0 0 4.3-2.1c3.82-3.82 3.57-7.87 2.05-10.39zm-6.25 11.08c3.35-3.35 4-6.78 1.98-10.47L21.2 12c-.3-.43-.71-.72-1.16-.8a1.12 1.12 0 0 0-.9.22c-.62.49-.74 1.18-.32 2.06l1.72 3.63a.5.5 0 0 1-.81.57l-8.91-8.9a1.33 1.33 0 0 0-1.89 1.88l5.3 5.3a.5.5 0 0 1-.71.7l-5.3-5.3-1.49-1.49c-.5-.5-1.38-.5-1.88 0a1.34 1.34 0 0 0 0 1.89l1.49 1.5 5.3 5.28a.5.5 0 0 1-.36.86.5.5 0 0 1-.36-.15l-5.29-5.29a1.34 1.34 0 0 0-1.88 0 1.34 1.34 0 0 0 0 1.89l2.23 2.23L9.3 21.4a.5.5 0 0 1-.36.85.5.5 0 0 1-.35-.14l-3.32-3.33a1.33 1.33 0 0 0-1.89 0 1.32 1.32 0 0 0-.39.95c0 .35.14.69.4.94l6.39 6.4c3.53 3.53 8.86 5.3 12.82 1.35zM12.73 9.26l5.68 5.68-.49-1.04c-.52-1.1-.43-2.13.22-2.89l-3.3-3.3a1.34 1.34 0 0 0-1.88 0 1.33 1.33 0 0 0-.4.94c0 .22.07.42.17.61zm14.79 19.18a7.46 7.46 0 0 1-6.41 2.31 7.92 7.92 0 0 1-3.67.9c-3.05 0-6.12-1.63-8.36-3.88l-6.4-6.4A2.31 2.31 0 0 1 2 19.72a2.33 2.33 0 0 1 1.92-2.3l-.87-.87a2.34 2.34 0 0 1 0-3.3 2.33 2.33 0 0 1 1.24-.64l-.14-.14a2.34 2.34 0 0 1 0-3.3 2.39 2.39 0 0 1 3.3 0l.14.14a2.33 2.33 0 0 1 3.95-1.24l.09.09c.09-.42.29-.83.62-1.16a2.34 2.34 0 0 1 3.3 0l3.38 3.39a2.17 2.17 0 0 1 1.27-.17c.54.08 1.03.35 1.45.76.1-.55.41-1.03.9-1.42a2.12 2.12 0 0 1 1.67-.4 2.8 2.8 0 0 1 1.85 1.25l3.65 6.43c1.7 2.83 2.03 7.37-2.2 11.6zM13.22.48l-1.92.89 2.37 2.83-.45-3.72zm8.48.88L19.78.5l-.44 3.7 2.36-2.84zM16.5 3.3L15.48 0h2.04L16.5 3.3z"
                    : "M15.81 9.04a1.37 1.37 0 0 0-.88-.6.81.81 0 0 0-.64.15c-.18.13-.72.55-.24 1.56l1.43 3.03a.54.54 0 1 1-.87.61L7.2 6.38a.99.99 0 1 0-1.4 1.4l4.4 4.4a.54.54 0 1 1-.76.76l-4.4-4.4L3.8 7.3a.99.99 0 0 0-1.4 0 .98.98 0 0 0 0 1.39l1.25 1.24 4.4 4.4a.54.54 0 0 1 0 .76.54.54 0 0 1-.76 0l-4.4-4.4a1 1 0 0 0-1.4 0 .98.98 0 0 0 0 1.4l1.86 1.85 2.76 2.77a.54.54 0 0 1-.76.76L2.58 14.7a.98.98 0 0 0-1.4 0 .99.99 0 0 0 0 1.4l5.33 5.32c3.37 3.37 6.64 4.98 10.49 1.12 2.74-2.74 3.27-5.54 1.62-8.56l-2.8-4.94z M11.74 0l.76 2.97.76-2.97zM16.63 1.22L15.2.75l-.4 3.03zM9.79.75l-1.43.47 1.84 2.56zM22.47 13.3L19.45 8c-.29-.43-.69-.7-1.12-.78a1.16 1.16 0 0 0-.91.22c-.3.23-.48.52-.54.84l.05.07 2.85 5c1.95 3.56 1.32 6.97-1.85 10.14a8.46 8.46 0 0 1-.55.5 5.75 5.75 0 0 0 3.36-1.76c3.26-3.27 3.04-6.75 1.73-8.91M12.58 9.89c-.16-.83.1-1.57.7-2.15l-2.5-2.49c-.5-.5-1.38-.5-1.88 0-.18.18-.27.4-.33.63l4.01 4z"
                }
                fill-rule='evenodd'
              ></path>
            </svg>
          </Button>
          <Button variant='link' className='p-0 mr-4 text-black-50' onClick={() => setClaps(!clapsModal)}>
            <span style={{ fontSize: 12 }}>{claps.length} </span>
          </Button>
          <svg width='33' height='33' viewBox='0 0 33 33' aria-label='clap'>
            <path
              d='M19.07 21.12a6.33 6.33 0 0 1-3.53-1.1 7.8 7.8 0 0 1-.7-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.66 0 8.46 3.5 8.46 7.8 0 2.06-.85 3.99-2.4 5.45a6.28 6.28 0 0 0 1.14 2.59c.15.21.17.48.06.7a.69.69 0 0 1-.62.38h-.03zm0-1v.5l.03-.5h-.03zm-3.92-1.64l.21.2a6.09 6.09 0 0 0 3.24 1.54 7.14 7.14 0 0 1-.83-1.84 5.15 5.15 0 0 1-.16-.75 2.4 2.4 0 0 1-.02-.29v-.23l.18-.15a6.6 6.6 0 0 0 2.3-4.96c0-3.82-3.4-6.93-7.6-6.93-4.19 0-7.6 3.11-7.6 6.93 0 3.83 3.41 6.94 7.6 6.94.83 0 1.64-.12 2.41-.35l.28-.08z'
              fill-rule='evenodd'
            ></path>
          </svg>
          <Button variant='link' className='p-0 mr-4 text-black-50' style={{ fontSize: 12 }} onClick={() => setResponses(!responses)}>
            {reviews.length}
          </Button>
        </div>

        <div style={{ fontSize: 24 }}>
          <IoLogoTwitter />
          <IoLogoLinkedin />
          <IoLogoFacebook />
          <IoBookmarkOutline />
        </div>
      </div>
      {responses && (
        <Modal show={responses} onHide={() => setResponses(!responses)} className='modalRight pr-0'>
          <Modal.Header closeButton>
            <h3>Responses</h3>
          </Modal.Header>
          <Modal.Body>
            {reviews.length > 0 ? (
              reviews.map((response, key) => <ResponsesItem response={response} key={key} editResponse={editResponse} deleteResponse={deleteResponse} user={user} />)
            ) : (
              <div className='text-center pt-5 h-100 w-100'>
                <i>There are currently no responses for this story. Be the first to respond.</i>
              </div>
            )}
          </Modal.Body>
        </Modal>
      )}
      <div style={{ marginTop: 50, marginBottom: 200 }}>
        <label>What are your thoughts?</label>
        <textarea style={{ width: "100%", padding: 20 }} value={review} onChange={(e) => setReview(e.target.value)} />
        <Button
          variant='success'
          onClick={() => {
            if (review.length > 0) {
              setReview("");
              postReview(review);
            }
          }}
        >
          Send
        </Button>
      </div>

      {clapsModal && (
        <Modal show={clapsModal} onHide={() => setClaps(!clapsModal)} className='modalCenter'>
          <Modal.Header closeButton>
            <h3>{claps.length} Claps </h3>
          </Modal.Header>
          <Modal.Body>
            {claps.length > 0 ? (
              claps.map((clap, key) => (
                <div>
                  <Link to='/'>
                    <div className='m-3'>
                      <img
                        alt='cover'
                        style={{ width: "40px", height: "40px", marginRight: "15px" }}
                        className='rounded-circle'
                        src={clap.img ? clap.img : "https://myworkspace.matrix42.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"}
                      />
                      <span className={"author"}>
                        <b>
                          {clap.name} {clap.surname}
                        </b>
                      </span>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className='text-center pt-5 h-100 w-100'>
                <i>There are currently no claps for this story. Be the first to clap.</i>
              </div>
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
