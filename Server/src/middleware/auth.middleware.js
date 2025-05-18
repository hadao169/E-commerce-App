import jwt from "jsonwebtoken";
// import User from '../models/user.model.js';

// export const auth = async (req, res, next) => {
//   try {
//     // 1. Lấy token từ header
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({ message: 'No authentication token, access denied' });
//     }

//     // 2. Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 3. Tìm user từ token
//     const user = await User.findById(decoded.userId).select('-password');
//     if (!user) {
//       return res.status(401).json({ message: 'Token is valid but user not found' });
//     }

//     // 4. Kiểm tra user status
//     if (!user.isActive) {
//       return res.status(403).json({ message: 'User account is disabled' });
//     }

//     // 5. Gán user vào request để sử dụng ở các middleware/controller tiếp theo
//     req.user = user;
//     next();
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token has expired' });
//     }
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Middleware kiểm tra role
// export const checkRole = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         message: 'Access denied: insufficient permissions'
//       });
//     }
//     next();
//   };
// };
// // Middleware cho admin routes
// export const adminAuth = async (req, res, next) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Admin access required' });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };
