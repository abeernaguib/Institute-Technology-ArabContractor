import React from 'react';
import { Link } from "react-router-dom";

const TechnicalEducationSection = () => {
  return (
    <section className="bg-white py-1">
      <div className="container mx-auto px-1">
        <div className="grid items-center gap-1 lg:grid-cols-2">
                  {/* Left Side - Content */}
                  <div className="space-y-1" dir="rtl">
                      {/* Introduction Card */}
                      <div className="bg-[#ECB22F]/10 flex gap-1 rounded-lg p-6 transition-shadow hover:shadow-lg">
                          <div className="flex-shrink-0">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ECB22F]">
                                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                              </div>
                          </div>
                          <div className="flex-1 text-right">
                              <h6 className="mb-3 text-lg font-bold text-gray-800">
                                  مدرسة المقاولون العرب الثانوية الفنية
                              </h6>
                              <p className="mb-2 leading-relaxed text-gray-700">
                                  من منطلق المسئولية المجتمعية للشركة فقد تم انشاء مدرسة المقاولون العرب الثانوية الفنية للتعليم المزدوج لتأهيل الكوادر الفنية على أسس علمية.
                              </p>
                              <p className="leading-relaxed text-gray-700">
                                  من خلالها يتم توفير فنيين متخصصين مدربين في مجال المعدات الثقيلة والمساهمة في تقليل البطالة.
                              </p>
                          </div>
                      </div>

                      {/* Qualification Card */}
                      <div className="bg-[#0865A8]/10 flex gap-4 rounded-lg p-6 transition-shadow hover:shadow-lg">
                          <div className="flex-shrink-0">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0865A8]">
                                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                  </svg>
                              </div>
                          </div>
                          <div className="flex-1 text-right">
                              <h6 className="mb-3 text-lg font-bold text-gray-800">
                                  المؤهل :
                              </h6>
                              <p className="leading-relaxed text-gray-700">
                                  دبلوم المدارس الثانوية الصناعية نظام الثلاث سنوات.
                              </p>
                          </div>
                      </div>

                      {/* Duration Card */}
                      <div className="bg-[#9F6F2A]/10 flex gap-4 rounded-lg p-6 transition-shadow hover:shadow-lg">
                          <div className="flex-shrink-0">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#9F6F2A]">
                                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                              </div>
                          </div>
                          <div className="flex-1 text-right">
                              <h6 className="mb-3 text-lg font-bold text-gray-800">
                                  مدة الدراسة والتدريب :
                              </h6>
                              <p className="leading-relaxed text-gray-700">
                                  3 سنوات دراسية
                              </p>
                          </div>
                      </div>

                      {/* Academic Year Card */}
                      <div className="bg-[#F5F7E1]/80 flex gap-4 rounded-lg p-6 transition-shadow hover:shadow-lg">
                          <div className="flex-shrink-0">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#393939]">
                                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                              </div>
                          </div>
                          <div className="flex-1 text-right">
                              <h6 className="mb-3 text-lg font-bold text-gray-800">
                                  العام الدراسي :
                              </h6>
                              <div className="space-y-2 text-gray-700">
                                  <p className="leading-relaxed">
                                      11 شهر ويمنح المتدرب أجازة سنوية شهر عن كل سنة بطلب توافق الشركة عليه.
                                  </p>
                                  <p className="leading-relaxed">
                                      يتلقى الطالب الدراسة النظرية في المدرسة يومان أسبوعيا.
                                  </p>
                                  <p className="leading-relaxed">
                                      يتلقى الطالب التدريبات المهنية 4 ايام أسبوعياً في المكان التدريبي.
                                  </p>
                                  <p className="font-semibold leading-relaxed text-[#393939]">
                                      في نهاية المرحلة تقوم الشركة بإبرام عقد توظيف للطلاب المتميزين براتب مناسب في حالة وجود أماكن.
                                  </p>
                              </div>
                          </div>
                      </div>

                      {/* Read More Button - Centered */}
                      <div className="pt-10 text-center">
                          <Link to="/Technical_Schools">
                              <button
                                  style={{
                                      backgroundColor: "#f57c00",
                                      color: "white",
                                      border: "none",
                                      borderRadius: "30px",
                                      padding: "12px 40px",
                                      fontSize: "1.1rem",
                                      cursor: "pointer",
                                      fontWeight: "bold",
                                      transition: "0.2s",
                                  }}
                              >
                                  اقرأ المزيد
                              </button>
                          </Link>
                      </div>
                  </div>


          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img
                src="/images/sch04.jpg" 
                alt="مدرسة المقاولون العرب"
                className="h-[760px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="mb-2 text-center text-3xl font-bold">
                  تطوير التعليم الفنى
                </h3>
                <h4 className="text-center text-xl">
                  مدرسة المقاولون العرب الثانوية الفنية
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalEducationSection;