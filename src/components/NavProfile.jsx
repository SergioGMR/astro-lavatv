import { useState, useEffect } from "react"
import { Button } from "@components/ui/Button"
import * as Avatar from "@radix-ui/react-avatar"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { avatarApiUrl } from "@lib/utils"
import { PowerOffIcon } from "lucide-react"
export default function ProfileSwitcher() {
    const [currentProfile, setCurrentProfile] = useState(null)
    const [profiles, setProfiles] = useState([])
    const localStorage = typeof window !== "undefined" ? window.localStorage : null
    useEffect(() => {
        if (localStorage) {
            const savedProfiles = localStorage.getItem("profiles")
            if (savedProfiles) {
                setProfiles(JSON.parse(savedProfiles))
            }
            const savedActiveProfile = localStorage.getItem("activeProfile")
            if (savedActiveProfile) {
                setCurrentProfile(JSON.parse(savedActiveProfile))
            }
            console.log(currentProfile)
        }
    }, [])
    const handleProfileChange = (profile) => {
        setCurrentProfile(profile)
        // Aquí puedes añadir lógica adicional para manejar el cambio de perfil
    }

    const handleLogout = () => {
        localStorage.removeItem("activeProfile")
        localStorage.removeItem("profiles")
        window.location.href = "/"
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button variant="ghost" className="size-full rounded">
                    <Avatar.Root className="inline-flex size-12 select-none items-center justify-center overflow-hidden rounded bg-blackA1 align-middle">
                        <Avatar.Image
                            className="size-full rounded-[inherit] object-cover"
                            src={`${avatarApiUrl}${currentProfile?.kind === "kids" ? currentProfile?.kind : currentProfile?.name}`}
                            alt="Colm Tuite"
                        />
                        <Avatar.Fallback
                            className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
                            delayMs={600}
                        >
                            {currentProfile?.name.charAt(0)}
                        </Avatar.Fallback>
                    </Avatar.Root>
                </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-56 rounded-md bg-white p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                    sideOffset={5}
                >
                    {
                        profiles.map((profile) => (
                            <DropdownMenu.Item className={`group ${currentProfile?.id === profile.id ? "bg-violet-500 text-white" : ""} hover:bg-black hover:text-white relative flex h-10 select-none items-center rounded-md pl-6 pr-2 text-sm leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1`}>
                                <button className="flex items-center w-full" onClick={() => handleProfileChange(profile)}>
                                    <Avatar.Root className="inline-flex mr-6 size-6 select-none items-center justify-center overflow-hidden rounded bg-blackA1 align-middle">
                                        <Avatar.Image
                                            className="size-full rounded-[inherit] object-cover"
                                            src={`${avatarApiUrl}${profile?.kind === "kids" ? profile?.kind : profile?.name}`}
                                            alt={profile.name}
                                        />
                                    </Avatar.Root>
                                    {profile.name}
                                    {`${profile.kind === "kids" ? "👶" : ""}`}
                                </button>
                            </DropdownMenu.Item>
                        ))
                    }
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item className="group hover:bg-black hover:text-white relative flex h-10 select-none items-center rounded-md pl-6 pr-2 text-sm leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
                        <button className="flex items-center" onClick={handleLogout}>
                            <PowerOffIcon className="text-red-500 w-4 h-4 mr-6" />
                            Cerrar sesión
                        </button>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}