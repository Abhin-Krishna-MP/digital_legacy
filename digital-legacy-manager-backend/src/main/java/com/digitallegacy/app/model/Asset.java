package com.digitallegacy.app.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type; // e.g. file, account, password, social, email, subscription
    private String category; // e.g. Personal, Work, Financial

    @Lob
    private String metadata; // JSON or extra info

    @Lob
    private String instructions; // Custom instructions for asset

    @Lob
    private String encryptedData; // For passwords/account info (encrypted)

    @ManyToOne
    private User owner;


    // Assigned executor/contact (legacy, for backward compatibility)
    @ManyToOne
    private TrustedContact trustedContact;

    // Permissions/instructions for each trusted contact (JSON: [{contactId, permissions, instructions}])
    @Lob
    private String assetPermissions;

    @Lob
    @Column(name = "file_data", columnDefinition = "LONGBLOB")
    private byte[] fileData; // For storing uploaded files (PDF, etc.)

    private String fileName;
    private String fileType;
}
