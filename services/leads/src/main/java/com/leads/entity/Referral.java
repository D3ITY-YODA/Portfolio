package com.leads.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "referrals")
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
@Builder
public class Referral {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String referrerUserId;

    @Column(nullable = false)
    private String referredUserId;

    private String referralCode;

    @Enumerated(EnumType.STRING)
    private ReferralStatus status;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) this.status = ReferralStatus.COMPLETED;
    }

    public enum ReferralStatus { COMPLETED, REWARDED, REJECTED }
}