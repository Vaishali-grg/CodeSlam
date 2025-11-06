"use client"

import { supabase } from '../supabaseClient';
import './Leaderboard.css';


import { useState, useEffect, useCallback } from "react"
import type { Database } from "../types/supabase"
type Team = Database["public"]["Tables"]["teams"]["Row"]

function LeaderboardPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setRefreshing(true)
    setError(null)

    const { data, error } = await supabase.from("teams").select("*").order("gems", { ascending: false })

    if (error) {
      console.warn(error)
      setError("Failed to load leaderboard. Please try again.")
    } else if (data) {
      setTeams(data)
    }

    setLoading(false)
    setRefreshing(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const medalForIndex = (i: number) => (i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null)

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            color: "#ffd700",
            fontWeight: "bold",
          }}
        >
          Loading Leaderboard...
        </h2>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://img.redbull.com/images/c_crop,x_0,y_0,h_1000,w_800/c_fill,w_450,h_600/q_auto,f_auto/redbullcom/2019/05/09/b6398f12-7d51-4279-a335-d9ba63e50199/clash-of-clans')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#1a1a2e",
        position: "relative",
        color: "#ffffff",
        padding: "3rem 1rem",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(rgba(26, 26, 46, 0.85), rgba(45, 45, 68, 0.85))",
          pointerEvents: "none",
        }}
      />

      <main style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "bold",
                color: "#ffd700",
                marginBottom: "1rem",
                textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
              }}
            >
              🏆 Team Leaderboard 🏆
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "#b0b0c3",
              }}
            >
              Witness the rise of champions. Teams are ranked by gems.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                textAlign: "center",
                padding: "1rem",
                background: "#d32f2f",
                color: "#fff",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Refresh Button */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <button
              onClick={fetchData}
              disabled={refreshing}
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "0.5rem",
                background: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "1rem",
                border: "none",
                cursor: refreshing ? "not-allowed" : "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                transform: refreshing ? "translateY(2px)" : "translateY(0)",
                opacity: refreshing ? 0.7 : 1,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => !refreshing && (e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.6)")}
              onMouseLeave={(e) => !refreshing && (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.4)")}
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Leaderboard List */}
          <div style={{ maxWidth: "50rem", margin: "0 auto" }}>
            {/* Header Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.125rem",
                fontWeight: "bold",
                color: "#ffd700",
                padding: "1rem",
                borderBottom: "3px solid #ffd700",
              }}
            >
              <div style={{ width: "16.666%", textAlign: "center" }}>Rank</div>
              <div style={{ width: "50% " }}>Team</div>
              <div style={{ width: "33.333%", textAlign: "right" }}>Gems</div>
            </div>

            {/* Body Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.75rem" }}>
              {teams.map((team, index) => (
                <div
                  key={team.id}
                  style={{
                    // background: "linear-gradient(135deg, #3d3d52 0%, #2d2d3f 100%)",
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem",
                    borderRadius: "1rem",
                    border: "2px solid #5a5a75",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {/* Rank */}
                  <div
                    style={{
                      width: "16.666%",
                      textAlign: "center",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    <span>{medalForIndex(index) ?? index + 1}</span>
                  </div>

                  {/* Team Name & Avatar */}
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "50%",
                        border: "2px solid #ffd700",
                      }}
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(team.name || "team")}`}
                      alt={`${team.name} avatar`}
                    />
                    <span
                      style={{
                        fontSize: "1.125rem",
                        color: "#ffffff",
                        fontWeight: "bold",
                      }}
                    >
                      {team.name}
                    </span>
                  </div>

                  {/* Points (Gems) */}
                  <div
                    style={{
                      width: "33.333%",
                      textAlign: "right",
                      fontSize: "1.25rem",
                      color: "#ffd700",
                      fontWeight: "bold",
                    }}
                  >
                    {team.gems ?? 0} <span aria-hidden>💎</span>
                  </div>
                </div>
              ))}

              {/* No Teams Message */}
              {teams.length === 0 && !loading && (
                <div
                  style={{
                    background: "linear-gradient(135deg, #3d3d52 0%, #2d2d3f 100%)",
                    padding: "1.5rem",
                    borderRadius: "1rem",
                    textAlign: "center",
                    color: "#b0b0c3",
                    border: "2px solid #5a5a75",
                  }}
                >
                  No teams have been created yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LeaderboardPage
