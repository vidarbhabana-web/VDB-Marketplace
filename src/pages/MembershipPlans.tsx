import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { membershipAPI } from '@/services/supabaseAPI'
import { MembershipPlan } from '@/types'
import LoadingSpinner from '@components/LoadingSpinner'

const MembershipPlans: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [plans, setPlans] = useState<MembershipPlan[]>([])

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await membershipAPI.getPlans()
        setPlans(data || [])
      } catch (error) {
        console.error('Failed to load membership plans:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPlans()
  }, [])

  const defaultPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 99,
      duration_days: 30,
      features: [
        'Business listing on VDB',
        'Basic profile information',
        'Up to 5 images',
        'Contact information',
        'Email support'
      ],
      description: 'Perfect for getting started'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 199,
      duration_days: 30,
      features: [
        'All Basic features',
        'Featured listing',
        'Up to 20 images',
        'Product catalog (20 items)',
        'WhatsApp contact button',
        'Priority support',
        'Analytics dashboard'
      ],
      description: 'Best for growing businesses'
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 499,
      duration_days: 90,
      features: [
        'All Premium features',
        'Top featured listing',
        'Unlimited images',
        'Product catalog (unlimited)',
        'Video support',
        'Social media integration',
        'Advanced analytics',
        '24/7 phone support'
      ],
      description: 'For established businesses'
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: 999,
      duration_days: 180,
      features: [
        'All Gold features',
        'Premium top listing',
        'Dedicated account manager',
        'Custom domain',
        'Email marketing integration',
        'Inventory management',
        'Staff profiles',
        'Priority in search results',
        'Custom branding options'
      ],
      description: 'For premium enterprises'
    }
  ]

  const displayPlans = plans.length > 0 ? plans : defaultPlans

  if (isLoading) {
    return <LoadingSpinner fullScreen />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="gradient-hero py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Membership Plans</h1>
            <p className="text-red-100 text-xl">
              Choose the perfect plan to grow your business
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-lg overflow-hidden shadow-lg transition-transform ${
                  index === 2 ? 'lg:scale-105 border-2 border-royal-red' : 'border border-border-gray'
                } bg-white`}
              >
                {index === 2 && (
                  <div className="bg-royal-red text-white text-center py-2 font-bold">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-royal-red">₹{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.duration_days} days</span>
                  </div>

                  <button className={`w-full py-3 rounded-lg font-semibold mb-6 transition-colors ${
                    index === 2
                      ? 'bg-royal-red text-white hover:bg-red-900'
                      : 'bg-light-gray text-royal-red hover:bg-border-gray'
                  }`}>
                    Get Started
                  </button>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-light-gray">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Plan Comparison</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Detailed feature comparison across all plans
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-dark-blue text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">Basic</th>
                  <th className="px-6 py-4 text-center">Premium</th>
                  <th className="px-6 py-4 text-center">Gold</th>
                  <th className="px-6 py-4 text-center">Platinum</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Business Listing', basic: true, premium: true, gold: true, platinum: true },
                  { feature: 'Featured Listing', basic: false, premium: true, gold: true, platinum: true },
                  { feature: 'Images Allowed', basic: true, premium: true, gold: true, platinum: true },
                  { feature: 'Product Catalog', basic: false, premium: true, gold: true, platinum: true },
                  { feature: 'WhatsApp Integration', basic: false, premium: true, gold: true, platinum: true },
                  { feature: 'Video Support', basic: false, premium: false, gold: true, platinum: true },
                  { feature: 'Analytics', basic: false, premium: true, gold: true, platinum: true },
                  { feature: 'Priority Support', basic: false, premium: true, gold: true, platinum: true },
                  { feature: 'Custom Domain', basic: false, premium: false, gold: false, platinum: true },
                  { feature: 'Dedicated Manager', basic: false, premium: false, gold: false, platinum: true }
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-light-gray'}>
                    <td className="px-6 py-4 font-semibold text-gray-800">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {row.basic ? <Check className="text-green-600 mx-auto" size={20} /> : <X className="text-gray-400 mx-auto" size={20} />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.premium ? <Check className="text-green-600 mx-auto" size={20} /> : <X className="text-gray-400 mx-auto" size={20} />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.gold ? <Check className="text-green-600 mx-auto" size={20} /> : <X className="text-gray-400 mx-auto" size={20} />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.platinum ? <Check className="text-green-600 mx-auto" size={20} /> : <X className="text-gray-400 mx-auto" size={20} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'Can I upgrade my plan anytime?', a: 'Yes, you can upgrade your plan at any time. The price difference will be calculated and applied immediately.' },
              { q: 'What happens after my plan expires?', a: 'Your listing will move to free tier. You can renew your plan anytime to restore premium features.' },
              { q: 'Is there a refund policy?', a: 'Yes, we offer 7-day money-back guarantee if you are not satisfied with the plan.' },
              { q: 'Do you offer annual discounts?', a: 'Yes! Contact our support team for exclusive annual subscription discounts.' }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default MembershipPlans
