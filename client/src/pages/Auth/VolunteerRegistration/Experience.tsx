import React from "react";

interface IComponentProps {
  currentStep: number;
  lastName: string;
  handleChange: any; // () => void????
}

interface IComponentState {
  test: string;
}

class Experience extends React.Component<IComponentProps, IComponentState> {
  render() {
    if (this.props.currentStep !== 2) {
      // Prop: The current step
      return null;
    }
    // The markup for the Step 1 UI
    return (
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          className="form-control"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Enter lastName"
          value={this.props.lastName} // Prop: The email input data
          onChange={this.props.handleChange} // Prop: Puts data into state
        />
      </div>
    );
  }
}

export default Experience;
