import { useState, useEffect } from "react"
import { avatarApiUrl } from "../lib/utils"

const guestProfile = {
    name: "Guest",
    kind: "guest",
    uuid: crypto.randomUUID(),
};
const hcprofiles = [
    {
        name: "Mike Doe",
        kind: "pelicula",
        uuid: crypto.randomUUID(),
    },
    {
        name: "Jane Doe",
        kind: "tv",
        uuid: crypto.randomUUID(),
    },
    {
        name: "Billy Doe",
        kind: "kids",
        uuid: crypto.randomUUID(),
    },
]

export default function Profiles() {
    const [profiles, setProfiles] = useState([])
    const [activeProfile, setActiveProfile] = useState(null)
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
            const savedActiveProfile = localStorage.getItem("activeProfile")
            if (savedActiveProfile) {
                setActiveProfile(JSON.parse(savedActiveProfile))
            }
        }
    }, [])

    const handleSetActiveProfile = (profile) => {
        localStorage.setItem("activeProfile", JSON.stringify(profile))
        setActiveProfile(profile)
    }

    const handleProfileClick = (profile) => {
        if (profile.kind === 'guest') {
            localStorage.removeItem("profiles")
            setProfiles([])
            handleSetActiveProfile(profile)
        } else {
            handleSetActiveProfile(profile)
        }
        window.location.href = "/main"
    }
    return (
        <section class="flex gap-x-10">
            {
                profiles.length > 0 &&
                profiles.map((profile) => (
                    <button
                        onClick={() => handleProfileClick(profile)}
                        data-uuid={profile.uuid}
                        id={profile.uuid}
                        class={`profileClass flex flex-col items-center gap-y-2 hover:scale-125 transition-all duration-300 ${activeProfile?.uuid === profile.uuid ? "scale-110" : ""}`}
                    >
                        <img
                            loading="lazy"
                            src={`${avatarApiUrl}${profile.kind === "kids" ? profile.kind : profile.name}`}
                            alt={profile.name}
                            class="w-24 h-24 rounded"
                        />
                        <h2 class="text-2xl font-bold">
                            {profile.name}
                        </h2>
                        {profile.kind === "kids" && (
                            <span class="text-sm capitalize">
                                ( kids )
                            </span>
                        )}
                    </button>
                ))
            }
            <button
                onClick={() => handleProfileClick(guestProfile)}
                id={guestProfile.uuid}
                data-uuid={guestProfile.uuid}
                class="profileClass flex flex-col items-center gap-y-2 hover:scale-125 transition-all duration-300"
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
