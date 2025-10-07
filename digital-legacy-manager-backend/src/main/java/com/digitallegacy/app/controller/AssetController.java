
package com.digitallegacy.app.controller;

import com.digitallegacy.app.model.Asset;
import com.digitallegacy.app.model.User;
import com.digitallegacy.app.model.TrustedContact;
import com.digitallegacy.app.repository.AssetRepository;
import com.digitallegacy.app.repository.UserRepository;
import com.digitallegacy.app.repository.TrustedContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    // Update asset permissions (trusted contact instructions/permissions)
    @PutMapping("/{id}/permissions")
    public Asset updateAssetPermissions(@PathVariable Long id, @RequestBody String assetPermissions, @AuthenticationPrincipal UserDetails principal) {
        User u = userRepository.findByUsername(principal.getUsername()).orElseThrow();
        Asset asset = assetRepository.findById(id).orElseThrow();
        if (!asset.getOwner().getId().equals(u.getId())) throw new org.springframework.security.access.AccessDeniedException("Forbidden");
        asset.setAssetPermissions(assetPermissions);
        return assetRepository.save(asset);
    }

    // Get asset details (for legacy execution simulation)
    @GetMapping("/{id}")
    public Asset getAsset(@PathVariable Long id, @AuthenticationPrincipal UserDetails principal) {
        User u = userRepository.findByUsername(principal.getUsername()).orElseThrow();
        Asset asset = assetRepository.findById(id).orElseThrow();
        if (!asset.getOwner().getId().equals(u.getId())) throw new org.springframework.security.access.AccessDeniedException("Forbidden");
    // Return asset as is (no decryption)
        return asset;
    }
    @GetMapping("/download/{id}")
    public org.springframework.http.ResponseEntity<byte[]> downloadFile(@PathVariable Long id, @AuthenticationPrincipal UserDetails principal) {
        User u = userRepository.findByUsername(principal.getUsername()).orElseThrow();
        Asset asset = assetRepository.findById(id).orElse(null);
        if (asset == null || asset.getOwner() == null || !asset.getOwner().getId().equals(u.getId()) || asset.getFileData() == null) {
            return org.springframework.http.ResponseEntity.notFound().build();
        }
    byte[] fileData = asset.getFileData();
    return org.springframework.http.ResponseEntity.ok()
        .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + asset.getFileName() + "\"")
        .header(org.springframework.http.HttpHeaders.CONTENT_TYPE, asset.getFileType() != null ? asset.getFileType() : "application/octet-stream")
        .body(fileData);
    }

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private TrustedContactRepository trustedContactRepository;

    @GetMapping
    public List<Asset> list(@AuthenticationPrincipal UserDetails principal) {
        User u = userRepository.findByUsername(principal.getUsername()).orElseThrow();
        return assetRepository.findByOwner(u);
    }

    // Get all trusted contacts for the current user (for asset assignment)
    @GetMapping("/trusted-contacts")
    public List<TrustedContact> getTrustedContacts(@AuthenticationPrincipal UserDetails principal) {
        User u = userRepository.findByUsername(principal.getUsername()).orElseThrow();
        return trustedContactRepository.findByOwner(u);
    }


    @PostMapping(consumes = {"multipart/form-data"})
    public Asset createFileAsset(
            @AuthenticationPrincipal UserDetails principal,
            @RequestPart("asset") Asset asset,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) throws Exception {
        User u = userRepository.findByUsername(principal.getUsername()).orElseThrow();
        asset.setOwner(u);
        if (asset.getTrustedContact() != null && asset.getTrustedContact().getId() != null) {
            TrustedContact tc = trustedContactRepository.findById(asset.getTrustedContact().getId()).orElse(null);
            asset.setTrustedContact(tc);
        }
        if (file != null && !file.isEmpty()) {
            asset.setFileData(file.getBytes());
            asset.setFileName(file.getOriginalFilename());
            asset.setFileType(file.getContentType());
        }
        // Store instructions and encryptedData as plain text
        return assetRepository.save(asset);
    }

    // Fallback for non-file assets (JSON)
    @PostMapping(consumes = {"application/json"})
    public Asset createJsonAsset(@AuthenticationPrincipal UserDetails principal, @RequestBody Asset asset) {
        User u = userRepository.findByUsername(principal.getUsername()).orElseThrow();
        asset.setOwner(u);
        if (asset.getTrustedContact() != null && asset.getTrustedContact().getId() != null) {
            TrustedContact tc = trustedContactRepository.findById(asset.getTrustedContact().getId()).orElse(null);
            asset.setTrustedContact(tc);
        }
        // Store instructions and encryptedData as plain text
        return assetRepository.save(asset);
    }

    // Simulate legacy execution for an asset
    @PostMapping("/{id}/trigger-legacy")
    public Asset triggerLegacy(@PathVariable Long id, @AuthenticationPrincipal UserDetails principal) {
        User u = userRepository.findByUsername(principal.getUsername()).orElseThrow();
        Asset asset = assetRepository.findById(id).orElseThrow();
        if (!asset.getOwner().getId().equals(u.getId())) throw new org.springframework.security.access.AccessDeniedException("Forbidden");
        // Simulate legacy execution (could set a flag, log, etc.)
        // For now, just return the asset (optionally, you could add a field or log)
        return asset;
    }
}
