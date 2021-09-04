import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";
import { useContext, useState, useEffect } from "react";

const UpdatePostModal = () => {
  //Context
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  //State
  const [editPost, setEditPost] = useState(post);

  useEffect(() => setEditPost(post), [post]);

  //Hide MODAL
  const closeDialog = () => {
    setEditPost(post);
    setShowUpdatePostModal(false);
  };

  const { title, description, url, status } = editPost;

  const onChangeUpdatePost = (event) => {
    setEditPost({
      ...editPost,
      [event.target.name]: event.target.value,
    });
  };

  //SUBMIT
  const submitForm = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(editPost);
    closeDialog();
    setShowToast({ type: success ? "success" : "danger", message: message });
  };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Marking progress</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitForm}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              required
              placeholder="Title..."
              name="title"
              area-aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatePost}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description..."
              name="description"
              value={description}
              onChange={onChangeUpdatePost}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Url..."
              name="url"
              value={url}
              onChange={onChangeUpdatePost}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatePost}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
