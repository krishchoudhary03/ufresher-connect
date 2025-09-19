import { useState } from "react";
import { Eye, EyeOff, User, Mail, Calendar, GraduationCap, Building } from "lucide-react";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { CosmicCard, CosmicCardContent, CosmicCardHeader, CosmicCardTitle } from "@/components/ui/cosmic-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

// Mock profile pictures
const profilePictures = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2", 
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=6",
  "https://i.pravatar.cc/150?img=7",
  "https://i.pravatar.cc/150?img=8",
];

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedProfilePic, setSelectedProfilePic] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    college: "",
    stream: "",
    role: "",
    adminCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    
    if (!isLogin) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.age) newErrors.age = "Age is required";
      if (!formData.college) newErrors.college = "College is required";
      if (!formData.stream) newErrors.stream = "Stream is required";
      if (!formData.role) newErrors.role = "Role is required";
      
      if (formData.adminCode && formData.adminCode !== "Createrkkrishavya") {
        newErrors.adminCode = "Invalid admin code";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = {
        id: Date.now(),
        name: formData.name || "User",
        email: formData.email,
        role: formData.adminCode === "Createrkkrishavya" ? "admin" : (formData.role || "junior"),
        profilePic: profilePictures[selectedProfilePic],
        age: formData.age,
        college: formData.college,
        stream: formData.stream,
      };

      onSuccess(user);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      const user = {
        id: Date.now(),
        name: "Google User",
        email: "user@gmail.com",
        role: "junior",
        profilePic: profilePictures[0],
        age: "20",
        college: "Sample College",
        stream: "Computer Science",
      };
      
      onSuccess(user);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <CosmicCard className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CosmicCardHeader className="text-center">
          <CosmicCardTitle className="text-2xl">
            {isLogin ? "Welcome Back" : "Join U-fresher ❤"}
          </CosmicCardTitle>
        </CosmicCardHeader>

        <CosmicCardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-cosmic"
              />
              {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-cosmic pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
            </div>

            {/* Sign Up Fields */}
            {!isLogin && (
              <>
                {/* Profile Picture Selection */}
                <div className="space-y-3">
                  <Label>Choose Profile Picture</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {profilePictures.map((pic, index) => (
                      <img
                        key={index}
                        src={pic}
                        alt={`Profile ${index + 1}`}
                        className={`profile-pic-option ${
                          selectedProfilePic === index ? "profile-pic-selected" : ""
                        }`}
                        onClick={() => setSelectedProfilePic(index)}
                      />
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-cosmic"
                  />
                  {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="18"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="input-cosmic"
                  />
                  {errors.age && <p className="text-destructive text-sm">{errors.age}</p>}
                </div>

                {/* College */}
                <div className="space-y-2">
                  <Label htmlFor="college" className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    College
                  </Label>
                  <Input
                    id="college"
                    placeholder="Your college name"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="input-cosmic"
                  />
                  {errors.college && <p className="text-destructive text-sm">{errors.college}</p>}
                </div>

                {/* Stream */}
                <div className="space-y-2">
                  <Label htmlFor="stream" className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Stream
                  </Label>
                  <Input
                    id="stream"
                    placeholder="Computer Science, Engineering, etc."
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                    className="input-cosmic"
                  />
                  {errors.stream && <p className="text-destructive text-sm">{errors.stream}</p>}
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger className="input-cosmic">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior (Student)</SelectItem>
                      <SelectItem value="mentor">Mentor</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-destructive text-sm">{errors.role}</p>}
                </div>

                {/* Admin Code (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="adminCode">Admin Code (Optional)</Label>
                  <Input
                    id="adminCode"
                    placeholder="Enter admin code if you're an admin"
                    value={formData.adminCode}
                    onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })}
                    className="input-cosmic"
                  />
                  {errors.adminCode && <p className="text-destructive text-sm">{errors.adminCode}</p>}
                </div>
              </>
            )}

            {/* Submit Button */}
            <CosmicButton
              type="submit"
              variant="hero"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
            </CosmicButton>

            {/* Google OAuth */}
            <CosmicButton
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleAuth}
              disabled={isLoading}
            >
              Continue with Google
            </CosmicButton>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>

          {/* Close Button */}
          <CosmicButton
            variant="ghost"
            onClick={onClose}
            className="w-full mt-4"
          >
            Close
          </CosmicButton>
        </CosmicCardContent>
      </CosmicCard>
    </div>
  );
}