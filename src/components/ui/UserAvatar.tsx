
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/data";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
}

const UserAvatar = ({ user, size = "md" }: UserAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={user.profileImage} alt={user.name} />
      <AvatarFallback>
        {user.name.split(" ").map(n => n[0]).join("")}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
