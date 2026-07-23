"use client";

import { useState } from "react";
import { notification } from "antd";
import {
    checkAvailability,
    register,
} from "@/services/authService";

export default function useRegister() {
    const [currentStep, setCurrentStep] = useState(0);
    const [checkingAvailability, setCheckingAvailability] = useState(false);

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        gender: "",
        date_of_birth: "",
        preferences: {
            preferred_release_year_from: null,
            preferred_release_year_to: null,
            genres: [],
            countries: [],
        },
    });

    const validateUsername = (username) => {
        if (!username.trim()) {
            return "Vui lòng nhập tên đăng nhập.";
        }
        if (username.length < 4) {
            return "Tên đăng nhập phải có ít nhất 4 ký tự.";
        }
        if (username.length > 30) {
            return "Tên đăng nhập không được vượt quá 30 ký tự.";
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới.";
        }
        return "";
    };

    const validateEmail = (email) => {
        if (!email.trim()) {
            return "Vui lòng nhập email.";
        }
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Email không hợp lệ.";
        }
        return "";
    };

    const validatePassword = (password) => {
        if (!password) {
            return "Vui lòng nhập mật khẩu.";
        }
        if (password.length < 8) {
            return "Mật khẩu phải có ít nhất 8 ký tự.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Mật khẩu phải có ít nhất 1 chữ cái viết hoa.";
        }
        if (!/[a-z]/.test(password)) {
            return "Mật khẩu phải có ít nhất 1 chữ cái viết thường.";
        }
        if (!/[0-9]/.test(password)) {
            return "Mật khẩu phải có ít nhất 1 chữ số.";
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            return "Mật khẩu phải có ít nhất 1 ký tự đặc biệt.";
        }
        return "";
    };

    const nextStep = async () => {
        if (currentStep !== 0) {
            setCurrentStep((prev) => prev + 1);
            return;
        }

        const usernameValidation = validateUsername(
            formData.username
        );
        const emailValidation = validateEmail(
            formData.email
        );
        const passwordValidation = validatePassword(
            formData.password
        );

        setUsernameError(usernameValidation);
        setEmailError(emailValidation);
        setPasswordError(passwordValidation);

        if (usernameValidation || emailValidation || passwordValidation) {
            return;
        }

        try {
            setCheckingAvailability(true);

            setUsernameError("");
            setEmailError("");

            const result = await checkAvailability(
                formData.username,
                formData.email
            );

            if (!result.username_available) {
                setUsernameError(
                    "Tên đăng nhập này đã tồn tại. Vui lòng chọn tên khác."
                );
            }

            if (!result.email_available) {
                setEmailError(
                    "Email này đã được sử dụng. Vui lòng sử dụng email khác."
                );
            }

            if (
                !result.username_available ||
                !result.email_available
            ) {
                return;
            }

            setCurrentStep((prev) => prev + 1);

        } catch (error) {
            console.error(
                "Check availability error:",
                error
            );

            notification.error({
                title: "Không thể kiểm tra thông tin",
                description: "Vui lòng thử lại sau.",
                placement: "topRight",
            });

        } finally {
            setCheckingAvailability(false);
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) =>
            Math.max(prev - 1, 0)
        );
    };

    const handleRegister = async () => {
        try {
            const res = await register(formData);

            console.log(res);

            notification.success({
                title: "Đăng ký thành công",
                description:
                    "Tài khoản của bạn đã được tạo thành công.",
                placement: "topRight",
            });

            window.location.href = "/login";

        } catch (error) {
            console.error(
                "Register error:",
                error
            );

            notification.error({
                title: "Đăng ký thất bại",
                description:
                    error?.response?.data?.detail ||
                    "Đã xảy ra lỗi khi đăng ký.",
                placement: "topRight",
            });
        }
    };

    return { currentStep, formData, setFormData, usernameError, emailError, passwordError,
         checkingAvailability, setUsernameError, setEmailError, setPasswordError, nextStep, prevStep, handleRegister };
}