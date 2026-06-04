package io.github.jhipster.sample.service;

import static org.assertj.core.api.Assertions.assertThat;

import io.github.jhipster.sample.IntegrationTest;
import io.github.jhipster.sample.domain.AuditLog;
import io.github.jhipster.sample.domain.enumeration.AuditAction;
import io.github.jhipster.sample.repository.AuditLogRepository;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for {@link AuditLogService}.
 */
@IntegrationTest
@WithMockUser(username = "test-user")
class AuditLogServiceIT {

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @AfterEach
    void cleanup() {
        auditLogRepository.deleteAll();
    }

    @Test
    @Transactional
    void shouldLogCreateAction() {
        auditLogService.log(AuditAction.CREATE, "invoice", 1L, "Created invoice number=INV-001");

        List<AuditLog> logs = auditLogRepository.findByEntityNameAndEntityIdOrderByPerformedAtDesc("invoice", 1L);
        assertThat(logs).hasSize(1);
        AuditLog log = logs.getFirst();
        assertThat(log.getAction()).isEqualTo(AuditAction.CREATE);
        assertThat(log.getEntityName()).isEqualTo("invoice");
        assertThat(log.getEntityId()).isEqualTo(1L);
        assertThat(log.getPerformedBy()).isEqualTo("test-user");
        assertThat(log.getPerformedAt()).isNotNull();
        assertThat(log.getDetails()).isEqualTo("Created invoice number=INV-001");
    }

    @Test
    @Transactional
    void shouldLogUpdateAction() {
        auditLogService.log(AuditAction.UPDATE, "invoice", 2L, "Updated invoice");

        List<AuditLog> logs = auditLogRepository.findByEntityNameAndEntityIdOrderByPerformedAtDesc("invoice", 2L);
        assertThat(logs).hasSize(1);
        assertThat(logs.getFirst().getAction()).isEqualTo(AuditAction.UPDATE);
    }

    @Test
    @Transactional
    void shouldLogDeleteAction() {
        auditLogService.log(AuditAction.DELETE, "invoice", 3L, "Deleted invoice");

        List<AuditLog> logs = auditLogRepository.findByEntityNameAndEntityIdOrderByPerformedAtDesc("invoice", 3L);
        assertThat(logs).hasSize(1);
        assertThat(logs.getFirst().getAction()).isEqualTo(AuditAction.DELETE);
    }

    @Test
    @Transactional
    void shouldLogWithoutDetails() {
        auditLogService.log(AuditAction.CREATE, "invoice", 4L);

        List<AuditLog> logs = auditLogRepository.findByEntityNameAndEntityIdOrderByPerformedAtDesc("invoice", 4L);
        assertThat(logs).hasSize(1);
        assertThat(logs.getFirst().getDetails()).isNull();
    }

    @Test
    @Transactional
    void shouldReturnLogsForEntityType() {
        auditLogService.log(AuditAction.CREATE, "invoice", 10L, "Created");
        auditLogService.log(AuditAction.UPDATE, "invoice", 11L, "Updated");
        auditLogService.log(AuditAction.DELETE, "bankAccount", 20L, "Deleted");

        List<AuditLog> invoiceLogs = auditLogService.getLogsForEntityType("invoice");
        assertThat(invoiceLogs).hasSize(2);
        assertThat(invoiceLogs).allMatch(l -> "invoice".equals(l.getEntityName()));
    }

    @Test
    @Transactional
    void shouldReturnLogsForSpecificEntity() {
        auditLogService.log(AuditAction.CREATE, "invoice", 100L, "Created");
        auditLogService.log(AuditAction.UPDATE, "invoice", 100L, "Updated");
        auditLogService.log(AuditAction.CREATE, "invoice", 200L, "Created another");

        List<AuditLog> logs = auditLogService.getLogsForEntity("invoice", 100L);
        assertThat(logs).hasSize(2);
        assertThat(logs).allMatch(l -> l.getEntityId().equals(100L));
    }

    @Test
    @Transactional
    void shouldLogPartialUpdateAction() {
        auditLogService.log(AuditAction.PARTIAL_UPDATE, "invoice", 5L, "Partial update");

        List<AuditLog> logs = auditLogRepository.findByEntityNameAndEntityIdOrderByPerformedAtDesc("invoice", 5L);
        assertThat(logs).hasSize(1);
        assertThat(logs.getFirst().getAction()).isEqualTo(AuditAction.PARTIAL_UPDATE);
    }
}
