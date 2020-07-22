import React from "react";
import Link from "@material-ui/core/Link";

const MaterialLink: React.FunctionComponent<any> = (props) => (
  <Link {...props}>{props.children}</Link>
);

export default MaterialLink;
