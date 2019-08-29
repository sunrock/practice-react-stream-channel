import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
  // renderError = ({ error }) => {
  //   return <div className="ui message">{error}</div>;
  // };

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
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Stream Title" />
        <Field
          name="description"
          component={this.renderTextArea}
          label="Description"
        />
        <button className="ui primary button clickable">Submit</button>
      </form>
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

export default reduxForm({ form: 'streamForm', validate })(StreamForm);
