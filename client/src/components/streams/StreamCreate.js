import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../actions';

class StreamCreate extends Component {
  state = {};

  // renderInput(formProps) {
  //   return (
  //     <input
  //       onChange={formProps.input.onChange}
  //       value={formProps.input.value}
  //     />
  //   );
  // }

  // renderInput({ input }) {
  //   return <input {...input} />;
  // }

  renderLabel = label => {
    return <label>{label}</label>;
  };

  // renderError = ({ error }) => {
  //   return <div className="ui message">{error}</div>;
  // };

  hasErrorClass = ({ touched, error }) => {
    return touched && error ? 'error' : '';
  };

  renderInput = ({ input, label, meta }) => {
    const divClass = `field ${this.hasErrorClass(meta)}`;
    return (
      <div className={divClass}>
        {this.renderLabel(label)}
        <input {...input} autoComplete="off" />
      </div>
    );

    // {this.renderError(meta)}
  };

  renderTextArea = ({ input, label, meta }) => {
    const divClass = `field ${this.hasErrorClass(meta)}`;
    return (
      <div className={divClass}>
        {this.renderLabel(label)}
        <textarea {...input} />
      </div>
    );

    // {this.renderError(meta)}
  };

  onSubmit = formValues => {
    // console.log(formValues);
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create Stream Channel</h3>
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

const formWrapped = reduxForm({ form: 'streamCreate', validate })(StreamCreate);

export default connect(
  null,
  { createStream }
)(formWrapped);
