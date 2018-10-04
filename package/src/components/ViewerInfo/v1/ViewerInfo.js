import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import { addTypographyStyles, applyTheme } from "../../../utils";

const ViewerProfileImageContainer = styled.div`
  display: flex;
  height: 30px;
  position: relative;
  width: 30px;
`;

const ViewerInfoContainer = styled.div`
  display: flex;
  position: relative;
`;

const ViewerFirstNameText = styled.span`
  ${addTypographyStyles("ViewerInfoInitials", "labelText")}
  display: ${({ compact, full }) => {
    if (full) {
      return compact ? "none" : "inline";
    }
    return "none";
  }};
  align-self: center;
  margin-left: 0.5rem;

  @media (min-width: ${applyTheme("breakpoint_md")}px) {
    display: ${({ compact }) => (compact ? "none" : "inline")};
  }
`;

class ViewerInfo extends Component {
  static propTypes = {
    /**
     * Enable this prop when you only want to display the initials/avatar on all screens
     */
    compact: PropTypes.bool,
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      /**
     * Profile image component to display
     */
      ProfileImage: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    }),
    /**
     * Enable this prop when you want to display the initials and first name on all screens
     */
    full: PropTypes.bool,
    /**
    * An object containing basic user information.
    */
    viewer: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      name: PropTypes.string,
      primaryEmailAddress: PropTypes.string.isRequired,
      profileImage: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    compact: false,
    full: false
  };

  /**
   *
   * @name viewerInitials
   * @summary Build the initials string from the `viewer` first and last name
   * If those props are not availible use the first letter of the primary email address.
   * @return {String} the viewers initials. (Patricia Smith => PS, Olamide => O, james.booker@ponderosafarms.com => J)
   */
  get viewerInitials() {
    const { viewer: { firstName, lastName, primaryEmailAddress } } = this.props;
    const firstInitial = (firstName && firstName.charAt()) || primaryEmailAddress.charAt().toUpperCase();
    const lastInitial = (lastName && lastName.charAt()) || "";
    return `${firstInitial}${lastInitial}`;
  }

  /**
   *
   * @name viewerName
   * @summary If `firstName` is availible on the `viewer` object
   * return that else return the email address
   * @return {String} the viewers name.
   */
  get viewerName() {
    const { viewer: { firstName, primaryEmailAddress } } = this.props;
    return (firstName && firstName) || primaryEmailAddress;
  }

  render() {
    const { compact, components: { ProfileImage }, full, viewer } = this.props;
    return (
      <ViewerInfoContainer>
        <ViewerProfileImageContainer>
          <ProfileImage viewer={viewer} />
        </ViewerProfileImageContainer>
        <ViewerFirstNameText compact={compact} full={full}>
          {this.viewerName}
        </ViewerFirstNameText>
      </ViewerInfoContainer>
    );
  }
}

export default withComponents(ViewerInfo);
