// src/pages/Verify.tsx
import { useState } from 'react';

const Verify = () => {
  const [step, setStep] = useState(1);
  const [verifyBy, setVerifyBy] = useState<'abha' | 'mobile' | 'aadhaar'>('abha');
  const [authMode, setAuthMode] = useState<'aadhaar' | 'password' | 'biometric'>('aadhaar');

  const [abhaNumber, setAbhaNumber] = useState('');
  const [mobile, setMobile] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [fetchedAbhas, setFetchedAbhas] = useState<string[]>([]);
  const [selectedAbha, setSelectedAbha] = useState('');
  const [profile, setProfile] = useState<any>(null);

  const mockProfile = (abha: string) => ({
    abhaNumber: abha,
    abhaAddress: `${abha.slice(0, 6).toLowerCase()}@abdm`,
    name: 'Amit Sharma',
    gender: 'Male',
    birthDate: '12/08/1990',
    mobile: '+91 9876543210',
    email: 'amit.s@example.com',
    photo: 'https://via.placeholder.com/100',
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?data=${abha}&size=150x150`
  });

  const handleReset = () => {
    setStep(1);
    setAbhaNumber('');
    setMobile('');
    setAadhaar('');
    setPassword('');
    setOtp('');
    setFetchedAbhas([]);
    setSelectedAbha('');
    setProfile(null);
  };

  const handleNext = () => setStep(2);

  const fetchAbhaList = () => {
    setTimeout(() => {
      setFetchedAbhas(['23456789123456', '34567890123457']);
      setStep(4);
    }, 800);
  };

  const handleContinue = () => {
    if (verifyBy === 'abha') {
      if (abhaNumber.length !== 14) {
        alert('Enter valid 14-digit ABHA number');
        return;
      }

      if (authMode === 'biometric') {
        setProfile(mockProfile(abhaNumber));
        setStep(5);
        return;
      }

      if (authMode === 'password') {
        setStep(3);
        return;
      }

      alert('OTP sent to linked mobile (1234)');
      setStep(3);
    } else {
      let isValid = false;
      if (verifyBy === 'mobile') isValid = /^[6-9]\d{9}$/.test(mobile);
      if (verifyBy === 'aadhaar') isValid = aadhaar.length === 12;

      if (!isValid) {
        alert('Please enter valid details');
        return;
      }

      alert('Fetching linked ABHA numbers...');
      fetchAbhaList();
    }
  };

  const handleVerify = () => {
    if (authMode === 'password') {
      if (password === 'abha@123') {
        setProfile(mockProfile(abhaNumber));
        setStep(5);
      } else {
        alert('Incorrect password. Try: abha@123');
      }
      return;
    }

    if (otp === '1234') {
      setProfile(mockProfile(abhaNumber));
      setStep(5);
    } else {
      alert('Invalid OTP. Try "1234"');
    }
  };

  const handleSelectAbha = () => {
    if (!selectedAbha) {
      alert('Please select an ABHA number');
      return;
    }
    setAbhaNumber(selectedAbha);
    alert('OTP sent to linked mobile (1234)');
    setStep(3);
  };

  return (
    <div className="card">
      {/* Step 1: Choose Method */}
      {step === 1 && (
        <>
          <h1 className="page-title">Verify ABHA</h1>
          <p className="page-subtitle">Choose how to verify your health ID</p>

          <div className="method-grid">
            <div className="method-card" onClick={() => {
              setVerifyBy('abha'); setAuthMode('aadhaar'); handleNext();
            }}>
              <div className="method-icon">🔐</div>
              <h3>ABHA + Aadhaar OTP</h3>
              <p>Verify using your ABHA ID and OTP.</p>
            </div>

            <div className="method-card" onClick={() => {
              setVerifyBy('abha'); setAuthMode('password'); handleNext();
            }}>
              <div className="method-icon">🔑</div>
              <h3>ABHA + Password</h3>
              <p>Use your registered password.</p>
            </div>

            <div className="method-card" onClick={() => {
              setVerifyBy('abha'); setAuthMode('biometric');
              setAbhaNumber('23456789123456');
              alert('Biometric scan successful.');
              setProfile(mockProfile('23456789123456'));
              setStep(5);
            }}>
              <div className="method-icon">🖐️</div>
              <h3>ABHA + Biometric</h3>
              <p>Scan fingerprint or iris. (Simulated)</p>
            </div>

            <div className="method-card" onClick={() => {
              setVerifyBy('mobile'); handleNext();
            }}>
              <div className="method-icon">📱</div>
              <h3>Verify via Mobile</h3>
              <p>Find ABHA linked to your mobile number.</p>
            </div>

            <div className="method-card" onClick={() => {
              setVerifyBy('aadhaar'); handleNext();
            }}>
              <div className="method-icon">🪪</div>
              <h3>Verify via Aadhaar</h3>
              <p>Find ABHA(s) linked to your Aadhaar.</p>
            </div>
          </div>
        </>
      )}

      {/* Step 2: Enter Details */}
      {step === 2 && (
        <>
          <button onClick={handleReset} className="back-button">← Back</button>
          <h2 className="page-title">Enter Details</h2>

          {verifyBy === 'abha' && (
            <>
              <div className="form-group">
                <label>ABHA Number</label>
                <input
                  type="text"
                  value={abhaNumber}
                  onChange={(e) => setAbhaNumber(e.target.value.replace(/\D/g, '').slice(0, 14))}
                  placeholder="Enter 14-digit ABHA number"
                  maxLength={14}
                />
              </div>
              {authMode !== 'password' && (
                <p className="page-subtitle">
                  OTP will be sent to your Aadhaar-linked mobile.
                </p>
              )}
            </>
          )}

          {verifyBy === 'mobile' && (
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
          )}

          {verifyBy === 'aadhaar' && (
            <div className="form-group">
              <label>Aadhaar Number</label>
              <input
                type="text"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                placeholder="Enter 12-digit Aadhaar"
                maxLength={12}
              />
            </div>
          )}

          <button onClick={handleContinue} className="btn-primary btn-block">
            Continue
          </button>
        </>
      )}

      {/* Step 3: OTP or Password */}
      {step === 3 && (
        <>
          <button onClick={() => setStep(2)} className="back-button">← Back</button>
          <h2 className="page-title">{authMode === 'password' ? 'Enter Password' : 'Enter OTP'}</h2>

          {authMode === 'password' ? (
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          ) : (
            <>
              <p className="page-subtitle">An OTP has been sent to your registered mobile.</p>
              <div className="form-group">
                <label>4-digit OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="Enter OTP"
                  maxLength={4}
                />
              </div>
            </>
          )}

          <button onClick={handleVerify} className="btn-primary btn-block">
            {authMode === 'password' ? 'Verify Password' : 'Verify OTP'}
          </button>
        </>
      )}

      {/* Step 4: Select ABHA */}
      {step === 4 && (
        <>
          <button onClick={() => setStep(2)} className="back-button">← Back</button>
          <h2 className="page-title">Select ABHA Number</h2>
          <p className="page-subtitle">Choose one of the ABHA IDs linked to your identity:</p>

          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            {fetchedAbhas.map((abha) => (
              <div key={abha} style={{ margin: '0.8rem 0' }}>
                <label>
                  <input
                    type="radio"
                    checked={selectedAbha === abha}
                    onChange={() => setSelectedAbha(abha)}
                  />{' '}
                  <strong>{abha}</strong>
                </label>
              </div>
            ))}
          </div>

          <button
            onClick={handleSelectAbha}
            disabled={!selectedAbha}
            className="btn-primary btn-block"
          >
            Continue
          </button>
        </>
      )}

      {/* Step 5: Profile */}
      {step === 5 && profile && (
        <>
          <button onClick={handleReset} className="back-button">← Home</button>
          <h2 className="page-title">ABHA Verified Successfully</h2>

          <div className="abha-card-preview">
            <h3>ABHA Card</h3>
            <img src={profile.photo} alt="Profile" className="profile" />
            <div className="detail"><strong>Name:</strong> {profile.name}</div>
            <div className="detail"><strong>ABHA Number:</strong> {profile.abhaNumber}</div>
            <div className="detail"><strong>ABHA Address:</strong> {profile.abhaAddress}</div>
            <div className="detail"><strong>Gender:</strong> {profile.gender}</div>
            <div className="detail"><strong>Date of Birth:</strong> {profile.birthDate}</div>
            <div className="detail"><strong>Mobile:</strong> {profile.mobile}</div>
            <div className="detail"><strong>Email:</strong> {profile.email}</div>
            <img src={profile.qrCode} alt="QR" className="qr-code" />
          </div>

          <button
            className="btn-primary btn-block"
            onClick={() => alert('Downloading ABHA card as PDF...')}
          >
            📄 Download ABHA Card
          </button>
        </>
      )}
    </div>
  );
};

export default Verify;