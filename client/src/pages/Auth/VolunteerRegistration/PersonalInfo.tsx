import React from "react";

interface IComponentProps {
  currentStep: number;
  email: string;
  handleChange: any; // () => void????
}

interface IComponentState {
  test: string;
}

class PersonalInfo extends React.Component<IComponentProps, IComponentState> {
  render() {
    if (this.props.currentStep !== 1) {
      // Prop: The current step
      return null;
    }
    // The markup for the Step 1 UI
    return (
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          className="form-control"
          id="email"
          name="email"
          type="text"
          placeholder="Enter email"
          value={this.props.email} // Prop: The email input data
          onChange={this.props.handleChange} // Prop: Puts data into state
        />
      </div>
    );
  }
}

export default PersonalInfo;
