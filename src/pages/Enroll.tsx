// src/pages/Enroll.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Enroll = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: select method, 2: Aadhaar, 3: Aadhaar OTP, 4: Mobile, 5: Mobile OTP, 6: ABHA Address, 7: Profile
  const [enrollmentMethod, setEnrollmentMethod] = useState<'aadhaar' | 'dl' | 'biometric'>('aadhaar');

  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarOtp, setAadhaarOtp] = useState('');
  const [mobile, setMobile] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [abhaAddress, setAbhaAddress] = useState('');

  const abhaSuggestions = [
    'user_12345@abdm',
    'health_id_888@abdm',
    'patient_xyz@abdm',
    'myabha_2025@abdm'
  ];

  const profileData = {
    abhaNumber: '23456789123456',
    name: 'Amit Sharma',
    gender: 'Male',
    birthDate: '12/08/1990',
    photo: 'https://via.placeholder.com/100',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=ABHA23456789123456&size=150x150'
  };

  const handleSelectMethod = (method: 'aadhaar' | 'dl' | 'biometric') => {
    setEnrollmentMethod(method);
    if (method === 'aadhaar') {
      setStep(2);
    } else {
      alert(`${method === 'dl' ? 'Driving Licence' : 'Biometric'} enrollment is not implemented yet.`);
    }
  };

  const handleSendAadhaarOtp = () => {
    if (aadhaarNumber.length === 12) {
      alert('OTP sent to Aadhaar-linked mobile (mock: 1234)');
      setStep(3);
    } else {
      alert('Enter a valid 12-digit Aadhaar number');
    }
  };

  const handleVerifyAadhaarOtp = () => {
    if (aadhaarOtp === '1234') {
      setStep(4);
    } else {
      alert('Invalid OTP. Try "1234"');
    }
  };

  const handleSendMobileOtp = () => {
    const isValid = /^[6-9]\d{9}$/.test(mobile);
    if (!isValid) {
      alert('Enter a valid 10-digit Indian mobile number');
      return;
    }
    alert(`OTP sent to +91 ${mobile}`);
    setStep(5);
  };

  const handleVerifyMobileOtp = () => {
    if (mobileOtp === '1234') {
      setStep(6);
    } else {
      alert('Invalid mobile OTP');
    }
  };

  const handleSelectAbhaAddress = () => {
    if (!abhaAddress) {
      alert('Please select an ABHA address');
      return;
    }
    setStep(7);
  };

  return (
    <div className="card">
      {/* Step 1: Select Method */}
      {step === 1 && (
        <>
          <h1 className="page-title">How do you want to enroll?</h1>
          <p className="page-subtitle">Choose a method to create your ABHA ID</p>

          <div className="method-grid">
            <div className="method-card" onClick={() => handleSelectMethod('aadhaar')}>
              <div className="method-icon">🪪</div>
              <h3>Using Aadhaar</h3>
              <p>Fast and widely used. OTP sent to registered mobile.</p>
            </div>

            <div className="method-card" onClick={() => handleSelectMethod('dl')}>
              <div className="method-icon">🚗</div>
              <h3>Using Driving Licence</h3>
              <p>Enroll using your DL details. (Coming Soon)</p>
            </div>

            <div className="method-card" onClick={() => handleSelectMethod('biometric')}>
              <div className="method-icon">🖐️</div>
              <h3>Using Biometric</h3>
              <p>Verify via fingerprint or iris scan at facility. (Coming Soon)</p>
            </div>
          </div>
        </>
      )}

      {/* Step 2: Aadhaar Number */}
      {step === 2 && (
        <>
          <button onClick={() => setStep(1)} className="back-button">← Back</button>
          <h2 className="page-title">Create ABHA via Aadhaar</h2>
          <p className="page-subtitle">Enter your 12-digit Aadhaar number</p>

          <div className="form-group">
            <label>Aadhaar Number</label>
            <input
              type="text"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
              placeholder="Enter 12-digit Aadhaar"
              maxLength={12}
            />
          </div>
          <button onClick={handleSendAadhaarOtp} className="btn-primary btn-block">
            Send OTP
          </button>
        </>
      )}

      {/* Step 3: Aadhaar OTP */}
      {step === 3 && (
        <>
          <button onClick={() => setStep(2)} className="back-button">← Back</button>
          <h2 className="page-title">Verify Aadhaar</h2>
          <p className="page-subtitle">Enter the 4-digit OTP sent to your mobile</p>

          <div className="form-group">
            <label>4-digit OTP</label>
            <input
              type="text"
              value={aadhaarOtp}
              onChange={(e) => setAadhaarOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="Enter OTP"
              maxLength={4}
            />
          </div>
          <button onClick={handleVerifyAadhaarOtp} className="btn-primary btn-block">
            Verify OTP
          </button>
        </>
      )}

      {/* Step 4: Enter Mobile */}
      {step === 4 && (
        <>
          <button onClick={() => setStep(3)} className="back-button">← Back</button>
          <h2 className="page-title">Update Mobile Number</h2>
          <p className="page-subtitle">Enter a mobile number for health updates</p>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter 10-digit mobile"
              maxLength={10}
            />
          </div>
          <button
            onClick={handleSendMobileOtp}
            disabled={mobile.length !== 10}
            className="btn-primary btn-block"
          >
            Send OTP
          </button>
        </>
      )}

      {/* Step 5: Mobile OTP */}
      {step === 5 && (
        <>
          <button onClick={() => setStep(4)} className="back-button">← Back</button>
          <h2 className="page-title">Verify Mobile</h2>
          <p className="page-subtitle">Enter OTP sent to <strong>+91 {mobile}</strong></p>

          <div className="form-group">
            <label>4-digit OTP</label>
            <input
              type="text"
              value={mobileOtp}
              onChange={(e) => setMobileOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="Enter OTP"
              maxLength={4}
            />
          </div>
          <button onClick={handleVerifyMobileOtp} className="btn-primary btn-block">
            Verify OTP
          </button>
        </>
      )}

      {/* Step 6: Select ABHA Address */}
      {step === 6 && (
        <>
          <button onClick={() => setStep(5)} className="back-button">← Back</button>
          <h2 className="page-title">Choose ABHA Address</h2>
          <p className="page-subtitle">Pick a unique username-like address</p>

          <div className="form-group">
            <label>Suggested Addresses</label>
            <select
              value={abhaAddress}
              onChange={(e) => setAbhaAddress(e.target.value)}
              style={{ fontSize: '1.1rem', padding: '0.75rem' }}
            >
              <option value="">-- Select an Address --</option>
              {abhaSuggestions.map((addr, i) => (
                <option key={i} value={addr}>{addr}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSelectAbhaAddress}
            disabled={!abhaAddress}
            className="btn-primary btn-block"
          >
            Create ABHA
          </button>
        </>
      )}

      {/* Step 7: Profile */}
      {step === 7 && (
        <>
          <button onClick={() => navigate('/')} className="back-button">← Home</button>
          <h2 className="page-title">Your ABHA Profile</h2>

          <div className="abha-card-preview">
            <h3>ABHA Card</h3>
            <img src={profileData.photo} alt="Profile" className="profile" />
            <div className="detail"><strong>Name:</strong> {profileData.name}</div>
            <div className="detail"><strong>ABHA Number:</strong> {profileData.abhaNumber}</div>
            <div className="detail"><strong>ABHA Address:</strong> {abhaAddress}</div>
            <div className="detail"><strong>Gender:</strong> {profileData.gender}</div>
            <div className="detail"><strong>Date of Birth:</strong> {profileData.birthDate}</div>
            <div className="detail"><strong>Mobile:</strong> +91 {mobile}</div>
            <img src={profileData.qrCode} alt="QR" className="qr-code" />
          </div>
          <button
            className="btn-primary btn-block"
            onClick={() => alert('Downloading ABHA card...')}
          >
            📄 Download ABHA Card
          </button>
        </>
      )}
    </div>
  );
};

export default Enroll;