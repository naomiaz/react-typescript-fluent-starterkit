import { any, async, fromJSX, Unit } from "widgets-for-react"
import React from 'react';
import { StandardLocalWidget, Updater } from "../../../widgets-extras";
import { contactUsIsValid, ContactUsState, contactUsUpdaters, contactUsValidations } from "./contactUsState";
import { Form, Button, InputGroup } from "react-bootstrap";
import { contactUsLayout } from "./contactUsLayout";
import { validations } from "../../../shared";

export const contactUsWidget : StandardLocalWidget<ContactUsState> = currentState => 
  currentState.submission == undefined || currentState.submission.kind != "loaded" ?
    fromJSX((setState:(_:Updater<ContactUsState>) => void) =>
      <Form noValidate onSubmit={e => { e.preventDefault(); setState(contactUsUpdaters.submit()) } }>
          <contactUsLayout.formItemInGroup 
            controlId="formName" name="name"
            type="text"
            value={currentState.input.name || ""}
            onChange={(newValue => setState(contactUsUpdaters.name(newValue)))}
            validation={currentState.validations.name || validations.tooEarlyToTell}
          >
          </contactUsLayout.formItemInGroup>
          <contactUsLayout.formItemInGroup 
            key={`contactUsPhoneNumber`}
            controlId="formPhoneNumber" name="Phone number"
            type="text"
            value={currentState.input.phoneNumber || ""}
            onChange={(newValue => setState(contactUsUpdaters.phoneNumber(newValue)))}
            validation={currentState.validations.phoneNumber || validations.tooEarlyToTell}
            >
          </contactUsLayout.formItemInGroup>
          <contactUsLayout.formItemInGroup 
            key={"contactUsEmail"}
            controlId="formBasicEmail" name="Email address"
            type="email"
            value={currentState.input.email || ""}
            onChange={(newValue => setState(contactUsUpdaters.email(newValue)))}
            validation={currentState.validations.email || validations.tooEarlyToTell}
          >
          </contactUsLayout.formItemInGroup>
          <contactUsLayout.formItemInGroup 
            controlId="formSubject" name="Subject"
            type="text" 
            value={currentState.input.subject || ""}
            onChange={(newValue => setState(contactUsUpdaters.subject(newValue)))}
            validation={currentState.validations.subject || validations.tooEarlyToTell}
          >
          </contactUsLayout.formItemInGroup>
          <contactUsLayout.formItemInGroup controlId="formBody" name="Body"
            type="text" 
            as="textarea" rows={5}
            value={currentState.input.body || ""}
            onChange={(newValue => setState(contactUsUpdaters.body(newValue)))}
            validation={currentState.validations.body || validations.tooEarlyToTell}
          >
            <Form.Text className="text-muted">
              Let us know what you think
            </Form.Text>
          </contactUsLayout.formItemInGroup>
          { submissionButton(currentState).run(setState) }
      </Form>
    ).wrapHTML(contactUsLayout.littleJump)
  :
  fromJSX(_ =>
    <contactUsLayout.thankYou />
  )

export const submissionButton : StandardLocalWidget<ContactUsState> = currentState => 
  currentState.submission == undefined ?
    fromJSX(setState =>
      <Button variant="primary" type="submit" disabled={contactUsIsValid(currentState) == false}>
        Submit
      </Button>
    )
  :
    any<Updater<ContactUsState>>()([
      async<Unit>()(currentState.submission).map(u => contactUsUpdaters.submission(u)),
      fromJSX(_ => <contactUsLayout.spinner />)
    ])

    