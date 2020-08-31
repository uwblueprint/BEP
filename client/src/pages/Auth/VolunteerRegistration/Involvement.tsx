import React from "react";

interface IComponentProps {
  currentStep: number;
  picklistInfo: any;
  involvement: any;
  handleChange: any; // () => void????
  handleNestedChange: any;
}

interface IComponentState {
  test: string;
}

class Involvement extends React.Component<IComponentProps, IComponentState> {
  render() {
    if (this.props.currentStep !== 3) {
      // Prop: The current step
      return null;
    }
    // The markup for the Step 1 UI
    return (
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          className="form-control"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Enter firstName"
          value={this.props.involvement.futureAdvice} // Prop: The email input data
          onChange={this.props.handleChange} // Prop: Puts data into state
        />
      </div>
    );
  }
}

export default Involvement;
