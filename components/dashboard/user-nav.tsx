import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useParams, usePathname} from "next/navigation";
import { useContextValue } from "@/components/providers/context";
import Link from "next/link";
import {useQuery} from "@apollo/client";
import {GET_STUDENT_PROFILE, GET_TUTOR_PROFILE} from "@/graphql/queries";

export function UserNav() {
  const { getters,setters } = useContextValue();
  const params = useParams();
  const { loading: loading1, error: error1, data: data1 } = useQuery(GET_STUDENT_PROFILE, {
    variables: { id: params?.userID },
    fetchPolicy: 'network-only'
  });
  const {loading: loading2, error: error2, data: data2} = useQuery(GET_TUTOR_PROFILE, {
    variables: { id: params?.userID },
    fetchPolicy: 'network-only'
  });

  let currentPath = usePathname();

  currentPath =
      currentPath?.includes('/student') ? `/${params?.userID}/student` :
          currentPath?.includes('/tutor') ? `/${params?.userID}/tutor` :
              currentPath;

  const userName = currentPath?.includes('/student') ? data1?.getStudentProfile?.username :
        currentPath?.includes('/tutor') ? data2?.getTutorProfile?.username :
            "";

    const userEmail = currentPath?.includes('/student') ? data1?.getStudentProfile?.email :
        currentPath?.includes('/tutor') ? data2?.getTutorProfile?.email :
            "";

    const userAvatar = currentPath?.includes('/student') ? data1?.getStudentProfile?.thumbnail :
        currentPath?.includes('/tutor') ? data2?.getTutorProfile?.thumbnail :
            "";

  const handleLogout = () => {
    setters.setEmail("");
    setters.setName("");
    setters.setIdentity("");
    window.location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar === "" ? "/default-user.png" : userAvatar} alt="default-user" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`${currentPath}/profile/demo`}>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={`${currentPath}/message`}>
            <DropdownMenuItem>
              Notification
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href={"/"} onClick={handleLogout}>
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
