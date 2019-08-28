import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';

class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderLabel = label => {
    return <label>{label}</label>;
  };

  hasErrorClass = ({ touched, error }) => {
    return touched && error ? 'error' : '';
  };

  renderInput = ({ input, label, meta }) => {
    const divClass = `field ${this.hasErrorClass(meta)}`;
    return (
      <div className={divClass}>
        {this.renderLabel(label)}
        <input
          {...input}
          autoComplete="off"
          placeholder={this.props.stream.title}
        />
      </div>
    );
  };

  renderTextArea = ({ input, label, meta }) => {
    const divClass = `field ${this.hasErrorClass(meta)}`;
    return (
      <div className={divClass}>
        {this.renderLabel(label)}
        <textarea {...input} placeholder={this.props.stream.description} />
      </div>
    );
  };

  onSubmit = formValues => {
    const streamId = this.props.match.params.id;
    this.props.editStream(streamId, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <h3>Loading...</h3>;
    }

    return (
      <div>
        <h3>Edit a Channel</h3>
        <form
          className="ui form error"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name="title"
            component={this.renderInput}
            label="Stream Title"
          />
          <Field
            name="description"
            component={this.renderTextArea}
            label="Description"
          />
          <button className="ui primary button">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = form => {
  const errors = {};
  if (!form.title) {
    errors.title = 'You must enter a title.';
  }
  if (!form.description) {
    errors.description = 'You must enter some description.';
  }
  return errors;
};

const formWarpped = reduxForm({ form: 'streamEdit', validate })(StreamEdit);

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  console.log(ownProps);
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(formWarpped);

// <Form.Group controlId="title">
// <Form.Label>Stream Title</Form.Label>
// <Form.Control type="text" placeholder="Enter title" />
// <Form.Text className="text-muted">
//   We'll never share your email with anyone else.
// </Form.Text>
// </Form.Group>

// <Form.Group controlId="description">
// <Form.Label>Description</Form.Label>
// <Form.Control type="text" placeholder="Enter description" />
// <Form.Text className="text-muted">
//   We'll never share your email with anyone else.
// </Form.Text>
// </Form.Group>
