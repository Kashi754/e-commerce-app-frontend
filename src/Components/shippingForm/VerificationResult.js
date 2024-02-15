import './verificationResult.css';

const VerificationResult = ({error, apiResponse, resetForm}) => (
  <div className='verification-result'>
    {apiResponse.deliverability &&
      <button className="reset-form-button" onClick={resetForm}>Edit Address</button>
    }
    {error && (
      <div className="apiErrorText">
        {error}
      </div>
    )}
    {apiResponse.deliverability && (
      <div className={`apiResultContainer ${apiResponse.deliverability === 'deliverable' ? ' green' : ' red'}`}>
        <p>{apiResponse.primary_line} {apiResponse.secondary_line} {apiResponse.last_line}</p>
        <h5>{apiResponse.deliverability}</h5>
      </div>
    )}
  </div>
);

export default VerificationResult;