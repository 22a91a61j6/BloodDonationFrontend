import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './registrationForm.css';
import axios from 'axios';
import moment from 'moment/moment';

const RegistrationForm = () => {
    // Use a clear variable name for the base backend URL
    const BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000/';

    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        college: '',
        phone: '',
        otp: ''
    });

    const [otpSent, setOtpSent] = useState(false);
    const [otpButtonDisabled, setOtpButtonDisabled] = useState(false);
    const [eventDate, setEventDate] = useState(null);

    // Fetch upcoming event
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${BASE_URL}get-upcoming-event`);
                if (response.status === 200) {
                    setEventDate(response.data);
                } else {
                    toast.error('No upcoming events found.');
                }
            } catch (err) {
                console.error('Error fetching event:', err);
                toast.error('Unable to fetch upcoming event');
            }
        })();
    }, [BASE_URL]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSendOTP = async () => {
        if (!formData.phone) {
            toast.error('Please enter a phone number before sending OTP');
            return;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            toast.error('Phone number must be exactly 10 digits');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}send-otp`, {
                phoneNumber: formData.phone
            });

            if (response.status === 200) {
                toast.success('OTP sent successfully!');
                setOtpSent(true);
                setOtpButtonDisabled(true);
            } else {
                toast.error('Failed to send OTP');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to send OTP');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otpSent) {
            toast.error('Please verify your phone number by entering the OTP');
            return;
        }

        try {
            // Step 1: Verify OTP
            const verifyResponse = await axios.post(`${BASE_URL}verify-otp`, {
                phoneNumber: formData.phone,
                otp: formData.otp
            });

            if (verifyResponse.status === 200) {
                // Step 2: Register
                try {
                    const registrationResponse = await axios.post(`${BASE_URL}register`, {
                        RollNumber: formData.rollNumber,
                        PhoneNumber: formData.phone,
                        EventDate: eventDate.Date
                    });

                    if (registrationResponse.status === 200) {
                        toast.success('Registration submitted successfully!');
                    } else {
                        toast.error('Student is already registered');
                    }

                    // Reset form
                    setFormData({
                        name: '',
                        rollNumber: '',
                        college: '',
                        phone: '',
                        otp: ''
                    });
                    setOtpSent(false);
                    setOtpButtonDisabled(false);
                } catch (e) {
                    console.error(e);
                    toast.error('Failed to register');
                }
            } else {
                toast.error('Invalid OTP');
                setOtpButtonDisabled(false);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error('Invalid OTP');
            setOtpButtonDisabled(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="headForContact">
                <span className="sectionTitle__small">
                    <i className="fa-solid fa-user btn__icon"></i>
                    Registration
                </span>
                {eventDate && <h2>Fill Your Details</h2>}
            </div>

            {eventDate ? (
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Roll Number</label>
                            <input
                                type="text"
                                name="rollNumber"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>College</label>
                            <input
                                type="text"
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Upcoming Event</label>
                            <div className="input-with-icon">
                                <input
                                    type="text"
                                    value={`${moment(eventDate.Date).format("DD-MM-YYYY")}    |    ${eventDate.EventName}`}
                                    readOnly
                                    className="read-only-input"
                                    title="This field is read-only"
                                />
                                <i className="fa fa-info-circle" title="This field is read-only"></i>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    style={{ flex: 1 }}
                                />
                                <button
                                    type="button"
                                    onClick={handleSendOTP}
                                    className="otp-button"
                                    disabled={otpButtonDisabled}
                                >
                                    Send OTP
                                </button>
                            </div>
                        </div>

                        {otpSent && (
                            <div className="form-group">
                                <label>Enter OTP</label>
                                <input
                                    type="text"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <button type="submit">Submit</button>
                    </form>
                </div>
            ) : (
                <div
                    className='form-container'
                    style={{
                        height: "300px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "black",
                        fontSize: "30px",
                        wordSpacing: "5px"
                    }}
                >
                    NO UPCOMING EVENTS TO REGISTER
                </div>
            )}
        </>
    );
};

export default RegistrationForm;
