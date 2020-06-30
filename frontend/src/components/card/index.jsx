import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Card, CardBody, CardSubtitle, CardLink, CardTitle, CardText,
} from 'reactstrap';

const BaseCard = ({
  user: {
    firstName, lastName, email, phone,
  },
}) => (

  <Col>
    <Card>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle className="mb-2 text-muted">{subtitle}</CardSubtitle>
        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
        <CardLink href="/#/">Card link</CardLink>
        <CardLink href="/#/">Another link</CardLink>
      </CardBody>
    </Card>
  </Col>

);

BaseCard.propTypes = {

};

export default BaseCard;
