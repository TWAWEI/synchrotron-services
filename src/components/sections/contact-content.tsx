"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface FormValues {
  name: string;
  company: string;
  industry: string;
  email: string;
  phone: string;
  serviceInterest: string;
  description: string;
  website: string;
}

const INDUSTRY_OPTIONS = [
  { value: "", label: "請選擇產業類別" },
  { value: "生技醫藥", label: "生技醫藥" },
  { value: "半導體與材料", label: "半導體與材料" },
  { value: "食品與農業", label: "食品與農業" },
  { value: "精密製造", label: "精密製造" },
  { value: "其他", label: "其他" },
] as const;

const SERVICE_OPTIONS = [
  { value: "", label: "請選擇感興趣的服務" },
  { value: "委託分析", label: "委託分析" },
  { value: "技術顧問", label: "技術顧問" },
  { value: "設備租用", label: "設備租用" },
  { value: "產學合作", label: "產學合作" },
] as const;

const inputBaseStyles =
  "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors duration-200";

const labelStyles = "mb-1 block text-sm font-medium text-gray-700";
const errorStyles = "mt-1 text-xs text-red-500";

function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") ?? "";

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      serviceInterest: preselectedService,
    },
  });

  async function onSubmit(data: FormValues) {
    setSubmitStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: { success?: boolean; error?: string } = await response.json();

      if (!response.ok || !result.success) {
        setServerError(result.error ?? "送出失敗，請稍後再試");
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");
    } catch {
      setServerError("網路錯誤，請稍後再試或直接聯繫我們");
      setSubmitStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-primary tracking-tight">聯絡我們</h1>
        <p className="text-lg text-gray-600">
          填寫以下表單，我們的專業團隊將盡快與您聯繫
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Form column (wider) */}
        <div className="lg:col-span-2">
          {submitStatus === "success" ? (
            <div className="rounded-xl bg-green-50 border border-green-200 p-8 text-center">
              <div className="mb-4 text-5xl">✓</div>
              <h2 className="mb-2 text-xl font-bold text-green-800">
                訊息已成功送出！
              </h2>
              <p className="text-green-700">
                感謝您的諮詢，我們的團隊將在 1-2 個工作天內與您聯繫。
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-xl bg-white p-8 shadow"
              noValidate
            >
              {/* Honeypot field */}
              <input
                type="text"
                {...register("website")}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] top-[-9999px] opacity-0"
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* 姓名 */}
                <div>
                  <label htmlFor="name" className={labelStyles}>
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="請輸入您的姓名"
                    className={cn(
                      inputBaseStyles,
                      errors.name && "border-red-400 focus:border-red-400 focus:ring-red-200"
                    )}
                    {...register("name", { required: "請輸入姓名" })}
                  />
                  {errors.name && (
                    <p className={errorStyles}>{errors.name.message}</p>
                  )}
                </div>

                {/* 公司名稱 */}
                <div>
                  <label htmlFor="company" className={labelStyles}>
                    公司名稱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="請輸入公司名稱"
                    className={cn(
                      inputBaseStyles,
                      errors.company && "border-red-400 focus:border-red-400 focus:ring-red-200"
                    )}
                    {...register("company", { required: "請輸入公司名稱" })}
                  />
                  {errors.company && (
                    <p className={errorStyles}>{errors.company.message}</p>
                  )}
                </div>

                {/* 產業類別 */}
                <div>
                  <label htmlFor="industry" className={labelStyles}>
                    產業類別 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="industry"
                    className={cn(
                      inputBaseStyles,
                      errors.industry && "border-red-400 focus:border-red-400 focus:ring-red-200"
                    )}
                    {...register("industry", { required: "請選擇產業類別" })}
                  >
                    {INDUSTRY_OPTIONS.map(({ value, label }) => (
                      <option key={value} value={value} disabled={value === ""}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.industry && (
                    <p className={errorStyles}>{errors.industry.message}</p>
                  )}
                </div>

                {/* 電子郵件 */}
                <div>
                  <label htmlFor="email" className={labelStyles}>
                    電子郵件 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="example@company.com"
                    className={cn(
                      inputBaseStyles,
                      errors.email && "border-red-400 focus:border-red-400 focus:ring-red-200"
                    )}
                    {...register("email", {
                      required: "請輸入電子郵件",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "請輸入有效的電子郵件地址",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className={errorStyles}>{errors.email.message}</p>
                  )}
                </div>

                {/* 電話 */}
                <div>
                  <label htmlFor="phone" className={labelStyles}>
                    電話
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="02-1234-5678"
                    className={inputBaseStyles}
                    {...register("phone")}
                  />
                </div>

                {/* 感興趣的服務 */}
                <div>
                  <label htmlFor="serviceInterest" className={labelStyles}>
                    感興趣的服務
                  </label>
                  <select
                    id="serviceInterest"
                    className={inputBaseStyles}
                    {...register("serviceInterest")}
                  >
                    {SERVICE_OPTIONS.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 需求描述 */}
              <div className="mt-6">
                <label htmlFor="description" className={labelStyles}>
                  需求描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={5}
                  placeholder="請描述您的需求或問題，例如：想分析的樣品類型、希望解決的問題等..."
                  className={cn(
                    inputBaseStyles,
                    "resize-none",
                    errors.description && "border-red-400 focus:border-red-400 focus:ring-red-200"
                  )}
                  {...register("description", {
                    required: "請描述您的需求",
                    maxLength: {
                      value: 1000,
                      message: "需求描述不得超過 1000 字",
                    },
                  })}
                />
                {errors.description && (
                  <p className={errorStyles}>{errors.description.message}</p>
                )}
              </div>

              {/* Server error */}
              {submitStatus === "error" && serverError && (
                <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                  <p className="text-sm text-red-700">{serverError}</p>
                </div>
              )}

              {/* Submit button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={submitStatus === "submitting"}
                  className={cn(
                    "inline-flex w-full items-center justify-center rounded-lg px-6 py-3 font-semibold transition-all duration-200",
                    submitStatus === "submitting"
                      ? "cursor-not-allowed bg-accent/60 text-primary/60"
                      : "bg-accent text-primary hover:bg-accent/90"
                  )}
                >
                  {submitStatus === "submitting" ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      送出中...
                    </>
                  ) : (
                    "送出諮詢"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact info column */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl bg-primary p-8 text-white">
            <h2 className="mb-6 text-xl font-bold">聯絡資訊</h2>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="mb-1 text-sm font-medium text-white/60">電子郵件</p>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-sm text-white hover:text-accent transition-colors duration-200"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="mb-1 text-sm font-medium text-white/60">電話</p>
                  <a
                    href={`tel:${siteConfig.contactPhone}`}
                    className="text-sm text-white hover:text-accent transition-colors duration-200"
                  >
                    {siteConfig.contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="mb-1 text-sm font-medium text-white/60">地址</p>
                  <p className="text-sm text-white">{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-3 font-bold text-primary">回覆時間</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              我們通常在 <span className="font-medium text-accent">1-2 個工作天</span>
              內回覆諮詢。如有緊急需求，歡迎直接致電聯繫。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactContent() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">載入中...</div>}>
      <ContactForm />
    </Suspense>
  );
}
