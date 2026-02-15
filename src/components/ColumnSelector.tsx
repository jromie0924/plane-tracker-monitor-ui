import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Theme } from '../theme/themes';
import { ColumnConfig } from '../types/ColumnConfig';

interface ColumnSelectorProps {
  theme: Theme;
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
}

export const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  theme,
  columns,
  onColumnsChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleColumn = (columnId: string) => {
    const updatedColumns = columns.map(col =>
      col.id === columnId ? { ...col, visible: !col.visible } : col
    );
    onColumnsChange(updatedColumns);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { borderColor: theme.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>
          ⚙ Columns
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Select Columns
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.closeButton, { color: theme.primary }]}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.columnList}>
              {columns.map(column => (
                <TouchableOpacity
                  key={column.id}
                  style={[styles.columnItem, { borderBottomColor: theme.border }]}
                  onPress={() => toggleColumn(column.id)}
                >
                  <View style={[styles.checkbox, { borderColor: theme.primary }]}>
                    {column.visible && (
                      <Text style={[styles.checkmark, { color: theme.primary }]}>
                        ✓
                      </Text>
                    )}
                  </View>
                  <Text style={[styles.columnLabel, { color: theme.text }]}>
                    {column.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: theme.primary }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.doneButtonText, { color: '#FFFFFF' }]}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxWidth: 400,
    maxHeight: '70%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  columnList: {
    padding: 16,
  },
  columnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  columnLabel: {
    fontSize: 16,
  },
  doneButton: {
    padding: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
