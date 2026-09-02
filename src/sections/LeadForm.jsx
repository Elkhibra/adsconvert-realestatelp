import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../components/Reveal";
import { Kicker } from "../components/Brand";
import { CheckIcon, ChevronRightIcon } from "../components/icons";
import { EASE, btnPrimary, btnOutline, fieldCls } from "../constants/ui";
import { submitLead } from "../lib/submitLead";

const emptyFormData = {
  role: "",
  propertyType: "",
  propertyTypeOther: "",
  hasAdvertising: "",
  goal: "",
  goalOther: "",
  inventory: "",
  budget: "",
  urgency: "",
  name: "",
  phone: "",
  email: "",
};

export default function LeadForm({ t, f, k, isRTL, language, scrollToElement }) {
  const [formData, setFormData] = useState(emptyFormData);
  const [submitted, setSubmitted] = useState(false);
  const reduce = useReducedMotion();

  const showOtherType = formData.propertyType === f.otherType;
  const showOtherGoal = formData.goal === f.otherGoal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitLead({ formData, language, f });
    setSubmitted(true);
    scrollToElement("form");
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData(emptyFormData);
  };

  return (
    <section id="form" className="bg-white py-14 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        <Reveal className="lg:col-span-2 lg:sticky lg:top-24">
          <Kicker text={k.form} />
          <h2
            className={`text-2xl sm:text-3xl font-black mb-3 text-[#0D0D0F] leading-tight ${
              !isRTL ? "tracking-tight" : ""
            }`}
          >
            {f.title}
          </h2>
          <p className="text-[#7A7A7A] leading-relaxed text-sm sm:text-base mb-6">
            {f.desc}
          </p>
          <h3 className="font-bold text-[#0D0D0F] mb-4 text-sm sm:text-base">
            {f.nextTitle}
          </h3>
          <ol className="space-y-3.5 mb-7">
            {f.nextSteps.map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FD1843]/10 text-[#FD1843] text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[#0D0D0F] text-sm sm:text-base leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <p className="flex items-center gap-2 text-xs sm:text-sm text-[#7A7A7A]">
            <CheckIcon className="w-3.5 h-3.5 text-[#FD1843] flex-shrink-0" />
            {f.privacy}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <div className="bg-[#F8F8F8] rounded-2xl p-5 sm:p-8 border border-[#E5E5E5]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="bg-white rounded-xl p-8 sm:p-10 text-center border border-[#E5E5E5]"
              >
                <div className="w-16 h-16 bg-[#FD1843] rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0D0D0F] mb-3">
                  {f.successTitle}
                </h3>
                <p className="text-[#7A7A7A] mb-7 leading-relaxed text-sm sm:text-base">
                  {f.successDesc}
                </p>
                <button onClick={resetForm} className={`${btnOutline} h-11 px-6 text-sm`}>
                  {f.reset}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#0D0D0F]">
                      {f.labelRole} <span className="text-[#FD1843]">*</span>
                    </label>
                    <select
                      required
                      className={fieldCls}
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    >
                      <option value="">{f.choose}</option>
                      {f.roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#0D0D0F]">
                      {f.labelPropertyType} <span className="text-[#FD1843]">*</span>
                    </label>
                    <select
                      required
                      className={fieldCls}
                      value={formData.propertyType}
                      onChange={(e) =>
                        setFormData({ ...formData, propertyType: e.target.value })
                      }
                    >
                      <option value="">{f.choose}</option>
                      {f.types.map((tp) => (
                        <option key={tp} value={tp}>
                          {tp}
                        </option>
                      ))}
                    </select>
                  </div>
                  {showOtherType && (
                    <input
                      type="text"
                      required
                      placeholder={f.otherTypePlaceholder}
                      className={fieldCls}
                      value={formData.propertyTypeOther}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          propertyTypeOther: e.target.value,
                        })
                      }
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-[#0D0D0F]">
                    {f.labelAdvertising} <span className="text-[#FD1843]">*</span>
                  </label>
                  <select
                    required
                    className={fieldCls}
                    value={formData.hasAdvertising}
                    onChange={(e) =>
                      setFormData({ ...formData, hasAdvertising: e.target.value })
                    }
                  >
                    <option value="">{f.choose}</option>
                    {f.ads.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-[#0D0D0F]">
                    {f.labelGoal} <span className="text-[#FD1843]">*</span>
                  </label>
                  <select
                    required
                    className={fieldCls}
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  >
                    <option value="">{f.choose}</option>
                    {f.goals.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                {showOtherGoal && (
                  <input
                    type="text"
                    required
                    placeholder={f.otherGoalPlaceholder}
                    className={fieldCls}
                    value={formData.goalOther}
                    onChange={(e) =>
                      setFormData({ ...formData, goalOther: e.target.value })
                    }
                  />
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#0D0D0F]">
                      {f.labelInventory} <span className="text-[#FD1843]">*</span>
                    </label>
                    <select
                      required
                      className={fieldCls}
                      value={formData.inventory}
                      onChange={(e) =>
                        setFormData({ ...formData, inventory: e.target.value })
                      }
                    >
                      <option value="">{f.choose}</option>
                      {f.inventoryOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#0D0D0F]">
                      {f.labelBudget} <span className="text-[#FD1843]">*</span>
                    </label>
                    <select
                      required
                      className={fieldCls}
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                    >
                      <option value="">{f.choose}</option>
                      {f.budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-[#0D0D0F]">
                    {f.labelUrgency} <span className="text-[#FD1843]">*</span>
                  </label>
                  <select
                    required
                    className={fieldCls}
                    value={formData.urgency}
                    onChange={(e) =>
                      setFormData({ ...formData, urgency: e.target.value })
                    }
                  >
                    <option value="">{f.choose}</option>
                    {f.urgencyOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder={f.placeholderName}
                    required
                    className={fieldCls}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder={f.placeholderPhone}
                    required
                    className={fieldCls}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <input
                  type="email"
                  placeholder={f.placeholderEmail}
                  required
                  className={fieldCls}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <button
                  type="submit"
                  className={`${btnPrimary} w-full min-h-[52px] text-base font-bold`}
                >
                  {t.form.buttonSubmit}
                  <ChevronRightIcon className="w-5 h-5" flip={isRTL} />
                </button>
                <p className="text-xs text-[#7A7A7A] text-center leading-relaxed">
                  {f.note}
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
