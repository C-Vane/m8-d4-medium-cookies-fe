import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import { IoIosMore, IoIosRemoveCircleOutline, IoIosBrush, IoIosTrash } from "react-icons/io";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import "./styles.scss";

export default function ResponsesItem({ user, response, editResponse, deleteResponse }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(response.text);
  useEffect(() => {
    setText(response.text);
  }, [response]);
  return (
    <div className='response'>
      <Link to='/'>
        <img
          alt='cover'
          style={{ width: "20px", height: "20px" }}
          className='rounded-circle'
          src={response.author.img ? response.author.img : "https://myworkspace.matrix42.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"}
        />
        <span className={"author"}>
          <b>{response.author.name} </b>
        </span>
      </Link>
      <Row className='justify-content-between w-100'>
        <Col>
          <h4 className={"date"}>
            <div className={"d-flex"}>
              <span>
                <Moment date={response.createdAt} format='MMM DD YYYY' />
              </span>
            </div>
          </h4>
          {edit ? (
            <div>
              {" "}
              <textarea value={text} onChange={(e) => setText(e.target.value)} />
              <Button
                variant='success'
                onClick={() => {
                  editResponse(response._id, { text });
                  setEdit(false);
                }}
              >
                Send
              </Button>
            </div>
          ) : (
            <p>{response.text}</p>
          )}
        </Col>
        <Dropdown>
          <Dropdown.Toggle variant='light' className='rounded-pill' style={{ fontSize: "1.5rem", color: "rgba(0,0,0,0.5)" }}>
            <IoIosMore />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {user._id === response.author._id ? (
              <>
                <Dropdown.Item onClick={() => setEdit(true)}>
                  <IoIosBrush />
                  <b className='ml-2'> Edit this Response</b>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => deleteResponse(response._id)}>
                  <IoIosTrash />
                  <b className='ml-2'>Delete this Response</b>
                </Dropdown.Item>
              </>
            ) : (
              <Dropdown.Item href='#/action-1'>
                <IoIosRemoveCircleOutline />
                <b className='ml-2'>Report</b>
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
    </div>
  );
}
