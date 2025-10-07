package com.digitallegacy.app.repository;

import com.digitallegacy.app.model.Asset;
import com.digitallegacy.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByOwner(User owner);
}
