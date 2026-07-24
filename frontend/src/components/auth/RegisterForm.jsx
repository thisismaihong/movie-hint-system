"use client";

import { useState } from "react";
import { Button, Steps } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined } from "@ant-design/icons";

import useRegister from "@/hooks/register/useRegister";
import StepPersonal from "./register/StepPersonal";
import StepPreferences from "./register/StepPreferences";
import StepPolicy from "./register/StepPolicy";

export default function RegisterForm() {
    const [agreed, setAgreed] = useState(false);

    const { currentStep, formData, setFormData, usernameError, emailError, passwordError, preferencesError,
        checkingAvailability, nextStep, prevStep, handleRegister, genres, countries, loadingOptions } = useRegister();

    const steps = [
        {
            title: "Thông tin cá nhân",
        },
        {
            title: "Sở thích",
        },
        {
            title: "Điều khoản",
        },
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <StepPersonal
                        formData={formData}
                        setFormData={setFormData}
                        usernameError={usernameError}
                        emailError={emailError}
                        passwordError={passwordError}
                    />
                );

            case 1:
                return (
                    <StepPreferences
                        formData={formData}
                        setFormData={setFormData}
                        preferencesError={preferencesError}
                        genres={genres}
                        countries={countries}
                        loadingOptions={loadingOptions}
                    />
                );

            case 2:
                return (
                    <StepPolicy
                        agreed={agreed}
                        setAgreed={setAgreed}
                    />
                );

            default:
                return null;
        }
    };

    const handleFinish = async () => {
        if (!agreed) {
            return;
        }

        await handleRegister();
    };

    return (
        <div className="w-full max-w-3xl rounded-3xl border border-purple-400/20 bg-white p-7 shadow-2xl lg:p-10">
            <div className="mb-10">
                <Steps current={currentStep} items={steps} responsive />
            </div>

            <div className="min-h-[300px]">
                {renderStepContent()}
            </div>

            <div className="mt-10 flex items-center justify-between">
                <Button size="large" icon={<ArrowLeftOutlined />} disabled={currentStep === 0} onClick={prevStep} className="!rounded-xl">
                    Quay lại
                </Button>

                {currentStep < steps.length - 1 ? (
                    <Button type="primary" size="large" icon={<ArrowRightOutlined />} iconPlacement="end" onClick={nextStep} loading={currentStep === 0 && checkingAvailability} className="!rounded-xl">
                        Tiếp tục
                    </Button>
                ) : (
                    <Button type="primary" size="large" loading={false} disabled={!agreed} icon={<CheckOutlined />} onClick={handleFinish} className="!rounded-xl">
                        Hoàn tất đăng ký
                    </Button>
                )}
            </div>
        </div>
    );
}