import { MouseEvent } from "react";

type Props = {
  onClose: (e: MouseEvent<HTMLElement>) => void
};

const DefaultModal = ({onClose}: Props) => {
  return <>
    <div className="modal-form">
      <div className="modal-form-outside" onClick={onClose} />

      {/* <!-- Modal content --> */}
      <div className="w-11/12 md:w-6/12 bg-white rounded-lg shadow dark:bg-gray-700 z-50">
        
        {/* <!-- Modal header --> */}
        <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
            Terms of Service
          </h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" 
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        
        {/* <!-- Modal body --> */}
        <div className="p-6 space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
          </p>
        </div>
        
        {/* <!-- Modal footer --> */}
        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button type='submit' className="btn-primary">I accept</button>
          <button type='reset' className="btn-secondary" onClick={onClose}>Decline</button>
        </div>

      </div>
    </div>
  </>
};

export default DefaultModal;
