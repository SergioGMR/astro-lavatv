import { useState, useEffect } from "react"
import { avatarApiUrl } from "../lib/utils"
import { useStore } from "@hooks/useStore"

const guestProfile = {
    name: "Guest",
    kind: "guest",
    uuid: crypto.randomUUID(),
};
const hcprofiles = [
    {
        name: "Mike",
        kind: "pelicula",
        uuid: crypto.randomUUID(),
    },
    {
        name: "Mike",
        kind: "pelicula",
        uuid: crypto.randomUUID(),
    },
    {
        name: "Mike",
        kind: "pelicula",
        uuid: crypto.randomUUID(),
    },
    {
        name: "Jane",
        kind: "tv",
        uuid: crypto.randomUUID(),
    },
    {
        name: "Billy",
        kind: "kids",
        uuid: crypto.randomUUID(),
    },
]

export default function Profiles() {
    const { currentProfile, setCurrentProfile } = useStore()
    const [profiles, setProfiles] = useState([])
    const localStorage = typeof window !== "undefined" ? window.localStorage : null
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedProfiles = localStorage.getItem("profiles")
            if (savedProfiles) {
                setProfiles(JSON.parse(savedProfiles))
            } else {
                setProfiles(hcprofiles)
                localStorage.setItem("profiles", JSON.stringify(hcprofiles))
            }
            const savedCurrentProfile = localStorage.getItem("currentProfile")
            if (savedCurrentProfile) {
                setCurrentProfile(JSON.parse(savedCurrentProfile))
            }
        }
    }, [])

    const handlesetCurrentProfile = (profile) => {
        localStorage.setItem("currentProfile", JSON.stringify(profile))
        setCurrentProfile(profile)
    }

    const handleProfileClick = (profile) => {
        if (profile.kind === 'guest') {
            localStorage.removeItem("profiles")
            setProfiles([])
            handlesetCurrentProfile(profile)
        } else {
            handlesetCurrentProfile(profile)
        }
        window.location.href = "/main"
    }
    return (
        <section class="flex flex-wrap justify-center items-center w-full max-w-sm md:max-w-md lg:max-w-5xl gap-16">
            {
                profiles.length > 0 &&
                profiles.map((profile) => (
                    <button
                        onClick={() => handleProfileClick(profile)}
                        data-uuid={profile.uuid}
                        id={profile.uuid}
                        class={`flex flex-col justify-end items-center gap-y-2 hover:scale-125 transition-all duration-300 ${currentProfile?.uuid === profile.uuid ? "scale-125" : ""}`}
                    >
                        <img
                            loading="lazy"
                            src={`${avatarApiUrl}${profile.kind === "kids" ? profile.kind : profile.name}`}
                            alt={profile.name}
                            class="w-24 h-24 rounded"
                        />
                        <section class="flex flex-col justify-center items-center">
                            <h2 class="text-2xl font-bold text-wrap max-w-xs">
                                {profile.name}
                                {profile.kind === "kids" && (
                                    <span class="text-xs capitalize ml-2">
                                        ( kids )
                                    </span>
                                )}
                            </h2>
                        </section>
                    </button>
                ))
            }
            <button
                onClick={() => handleProfileClick(guestProfile)}
                id={guestProfile.uuid}
                data-uuid={guestProfile.uuid}
                class="flex flex-col items-center gap-y-2 hover:scale-125 transition-all duration-300"
            >
                <img
                    src={`${avatarApiUrl}${guestProfile.name}`}
                    alt={guestProfile.name}
                    class="w-24 h-24 rounded"
                />
                <h2 class="text-2xl font-bold">
                    {guestProfile.name}
                </h2>
                {
                    guestProfile.kind === "kids" && (
                        <span class="text-sm capitalize">( kids )</span>
                    )
                }
            </button>
        </section>
    )
}
