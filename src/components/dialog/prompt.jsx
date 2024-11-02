import React, { useState } from "react";
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import { createConfirmation } from 'react-confirm';

const Prompt=({show, title, proceed, confirmation, options})=> {
  const [showModal, setShowModal] = useState(show);
  return (
      <TEModal show={ showModal } setShow={setShowModal}>
        <TEModalDialog centered size="lg">
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                {title}
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            {confirmation instanceof Array?
            <TEModalBody>
<div className="flex flex-col space-y-2 justify-start pl-4">
{confirmation.map((message,i)=>{

  return <div className="content-start capitalize">{i+1}.&nbsp;&nbsp;{message}</div>
})}
</div>
            </TEModalBody>
            : <TEModalBody>{confirmation}</TEModalBody>}
           
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-gray-300 px-4 pb-2 pt-2 text-sm font-medium rounded-md transition duration-150 ease-in-out"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </TERipple>
              {(proceed!=undefined?
              <TERipple rippleColor="light">
                <button
                  type="button" onClick={(e)=>{ var success=proceed(e);setShowModal(!success); }}
                  className="ml-1 inline-block rounded bg-Primary px-4 pb-2 pt-2 text-sm font-medium rounded-md text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out "
                >
                  Confirm
                </button>
              </TERipple>:<></>)}
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
  );
}

Prompt.propTypes = {
    show: PropTypes.bool,            // from confirmable. indicates if the dialog is shown or not.
    proceed: PropTypes.func,  
    title:   PropTypes.string,     // from confirmable. call to close the dialog with promise resolved.
    confirmation: PropTypes.string,  // arguments of your confirm function
    options: PropTypes.object        // arguments of your confirm function
  }


  export default confirmable(Prompt);
  export const confirm = createConfirmation(Prompt);
  export const alertBox = createConfirmation(Prompt);
  export function confirmWrapper(confirmation, options = {}) {
    return confirm({ confirmation, options });
  }

