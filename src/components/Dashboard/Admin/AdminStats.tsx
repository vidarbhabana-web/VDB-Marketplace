import React from 'react'
import { motion } from 'framer-motion'

const AdminStats: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Admin stats content */}
    </motion.div>
  )
}

export default AdminStats
