import React from 'react';
import { Range } from 'immutable';
import { Form, Button, Card, Container, Row, Col, Spinner, Jumbotron, InputGroup, CardDeck, CardColumns } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { ProductInfo } from '../productsState';

export const productLayout = ({
  card:(props:{ product:ProductInfo, addProduct:() => void }) =>
        <Card>
          <Card.Body>
            <Row>
              <Col lg="10">
                <Card.Title>{props.product.name}</Card.Title>
                <Card.Text>
                  <span dangerouslySetInnerHTML={{ __html:props.product.description} } />
                </Card.Text>
              </Col>
              <Col lg="2">
                <img src={props.product.imageURL} width="64px" />
              </Col>
            </Row>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col lg="10">
                  <div>
                      {
                        Range(0, props.product.rating).map(_ => 
                          <span className="fa fa-star starChecked" />
                        ).toArray()
                      }
                      {
                        Range(props.product.rating, 5).map(_ => 
                          <span className="fa fa-star" />
                          ).toArray()
                        }
                    </div>
                </Col>
                <Col lg="2">
                  <Button variant="primary" onClick={_ => props.addProduct()}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <span>{` ${props.product.price}`}€</span>
                  </Button> 
                </Col>
              </Row>
            </Card.Footer>
          </Card>
})